import { GenericProps, GenericReference } from './genericTypes';

type DocumentImageHref = string;
type DocumentPdfHref = string;
type DocumentDescription = string;
type DocumentSubtitle = string;
type DocumentSubDescription = string[];
type DocumentFullPath = string;

interface DocumentProps extends GenericProps {
  imageRef: DocumentImageHref[];
  pdfRef: DocumentPdfHref;
  description: DocumentDescription;
  subtitle?: DocumentSubtitle;
  subDescription?: DocumentSubDescription;
  fullPath?: DocumentFullPath;
}

type DocumentDirectory = {
  [key: string]: DocumentProps;
};

export class DocumentStore {
  private static contentDir: DocumentDirectory = {}

  static registerContent(props: DocumentProps): void {
    this.contentDir[props.reference] = props;
  }

  static getContent(reference: GenericReference): DocumentProps {
    return Object.assign({}, this.contentDir[reference]);
  }
}

