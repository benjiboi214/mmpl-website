import { Router, Request, Response } from 'express';
import { GenericProps, GenericReference, GenericLabel } from './genericTypes';

export interface SiteTreeProps {
  expressRouter: Router;
  rootLabel: string;
}

type PageHref = string;
type ExternalHref = PageHref;
type BreadcrumbActive = boolean;
type MenuToggle = boolean;
type MenuSettings = {
  [key: string]: MenuToggle;
};
type PageController = (req: Request, res: Response) => void;

export interface PageProps extends GenericProps {
  href?: PageHref;
  externalHref?: ExternalHref;
  children?: GenericReference[];
  parent?: GenericReference;
  menuSettings?: MenuSettings;
  pageController?: PageController;
}

type PageDirectory = {
  [key: string]: PageProps;
};

type BreadcrumbViewModel = {
  label: GenericLabel;
  href: PageHref | false;
  active: BreadcrumbActive;
};

interface LinkViewModel {
  label: GenericLabel;
  href: PageHref;
}

interface MenuViewModel extends LinkViewModel {
  label: GenericLabel;
  href: PageHref;
  children?: MenuViewModel[];
}

type ChildrenViewModel = LinkViewModel[];

export class SiteTree {
  static rootLabel = 'root';
  static expressRouter = Router();

  private static rootPage: PageProps;
  private static pageDir: PageDirectory = {};

  static registerPage(props: PageProps): void {
    SiteTree.pageDir[props.reference] = props;
    const thisPage = SiteTree.pageDir[props.reference];
    if (props.parent === SiteTree.rootLabel) {
      this.rootPage = thisPage;
    } else {
      // Set the parent of this registration to be the parent in the props
      thisPage.parent = SiteTree.pageDir[props.parent].reference;
      // Set the parents children to be this registration
      const parent = SiteTree.pageDir[props.parent];
      parent.children = parent.children || [];
      parent.children.includes(props.reference)
        ? null
        : parent.children.push(props.reference);
    }
  }

  static getPage(reference: GenericReference): PageProps {
    return SiteTree.pageDir[reference];
  }

  static getRootPage(): PageProps {
    return this.getPage(SiteTree.rootPage.reference);
  }

  private static buildPath(
    accummulator: PageHref,
    reference: GenericReference
  ): PageHref {
    const { href, externalHref, parent } = this.getPage(reference);
    if (externalHref) {
      return externalHref;
    } else if (href) {
      const builtPath: PageHref = href.concat(accummulator);
      if (parent === SiteTree.rootLabel) {
        return builtPath;
      } else {
        return this.buildPath(builtPath, parent);
      }
    } else {
      throw new Error('Config Error: must have one of href or externalHref');
    }
  }

  static getURLPath(reference: GenericReference): PageHref {
    return this.buildPath('', reference);
  }

  private static buildBreadcrumb(
    accumulator: BreadcrumbViewModel[],
    reference: GenericReference,
    first: boolean
  ): BreadcrumbViewModel[] {
    // Get the object being referenced
    const { label, parent } = this.getPage(reference);
    // Build out the individual viewModel
    const viewModel: BreadcrumbViewModel = {
      label,
      href: this.getURLPath(reference),
      active: first,
    };
    // Check if parent is home
    accumulator.unshift(viewModel);
    if (parent === SiteTree.rootLabel) {
      // return what we have
      return accumulator;
    } else {
      // return a call to this function
      return this.buildBreadcrumb(accumulator, parent, false);
    }
  }

  static getBreadcrumbs(reference: GenericReference): BreadcrumbViewModel[] {
    const breadcrumbs: BreadcrumbViewModel[] = [];
    return this.buildBreadcrumb(breadcrumbs, reference, true);
  }

  private static buildMenuChildren(
    targetMenu: string,
    targetArray: MenuViewModel[],
    childReferences: GenericReference[]
  ): MenuViewModel[] {
    childReferences.forEach((reference) => {
      const child = this.getPage(reference);

      // If menu is enabled, build the view model
      if (child.menuSettings && child.menuSettings[targetMenu]) {
        const viewModel: MenuViewModel = {
          label: child.label,
          href: this.getURLPath(reference),
        };

        // If the view model has children, recurse
        if (child.children) {
          let childrenArray: MenuViewModel[] = [];
          childrenArray = this.buildMenuChildren(
            targetMenu,
            childrenArray,
            child.children
          );

          // Only add the children attribute if any present
          if (childrenArray.length > 0) {
            viewModel.children = childrenArray;
          }
        }

        targetArray.push(viewModel);
      }
    });
    return targetArray;
  }

  private static buildBaseMenu(targetMenu: string): MenuViewModel[] {
    const { label, reference, children } = this.getRootPage();

    let menu: MenuViewModel[] = [];
    menu.push({ label, href: this.getURLPath(reference) });
    menu = this.buildMenuChildren(targetMenu, menu, children);

    return menu;
  }

  static getHeaderMenu(): MenuViewModel[] {
    return this.buildBaseMenu('header');
  }

  static getFooterMenu(): MenuViewModel[] {
    return this.buildBaseMenu('footer');
  }

  private static buildRoutes(
    router: Router,
    childReferences: GenericReference[]
  ): void {
    childReferences.forEach((reference) => {
      const child = this.getPage(reference);
      if (child.pageController) {
        router.get(this.getURLPath(child.reference), child.pageController);
      }
      if (child.children) {
        this.buildRoutes(router, child.children);
      }
    });
  }

  static getExpressRouter(): Router {
    const router = Router();
    const rootPage = this.getRootPage();

    // Set up root route
    router.get(this.getURLPath(rootPage.reference), rootPage.pageController);
    if (rootPage.children && rootPage.children.length > 0) {
      this.buildRoutes(router, rootPage.children);
    }

    return router;
  }

  static getDirectChildrenLinks(reference: GenericReference): ChildrenViewModel {
    const thisPage = SiteTree.getPage(reference);
    const arrayhing = thisPage.children.map(childReference => {
      const child = SiteTree.getPage(childReference);
      return {
        label: child.label,
        href: SiteTree.getURLPath(child.reference)
      };
    });
    console.log(arrayhing);
    return arrayhing;
  }
}
