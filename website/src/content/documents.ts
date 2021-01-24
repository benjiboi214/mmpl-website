const documents = [
  {
    reference: 'scoresheet',
    label: 'Scoresheet',
    href: 'scoresheet/',
    parent: 'documents',
    imageRef: ['media/mmpl_generic_scoresheet.png'],
    pdfRef: 'media/mmpl_generic_scoresheet.pdf',
    description:
      'This is the scoresheet used to capture the results of the Summer and Winter MMPL seasons.',
    subtitle: 'On the night',
    subDescription: [
      'Fill out the date, division and team names.',
      'Ensure wins and losses are marked clearly.',
      'Tally the totals.',
      'Both captains need to sign the scoresheet.',
      'Submit the details of any new players.',
    ],
  },
  {
    reference: 'team-nomination',
    label: 'Team Nomination',
    href: 'team-nomination/',
    parent: 'documents',
    imageRef: ['media/mmpl_team_nomination.png'],
    pdfRef: 'media/mmpl_team_nomination.pdf',
    description:
      'Use this form to nominate your team for the next MMPL season.',
    subtitle: 'Please note',
    subDescription: [
      'It is the teams responsibility to negotiate with the venue.',
      'Ensure that there are enough tables at the venue for the number of teams.',
      'You need to submit a new team nomination team every season.',
      'Five players are required to play.',
      'If you are short players, please submit the form and contact the committee for help finding spare players.',
      'Submit this form to the MMPL Statisitician.',
    ],
  },
  {
    reference: 'player-registration',
    label: 'Player Registration',
    href: 'player-registration/',
    parent: 'documents',
    imageRef: ['media/mmpl_player_registration_1of2.png', 'media/mmpl_player_registration_2of2.png'],
    pdfRef: 'media/mmpl_player_registration.pdf',
    description:
      'This is the scoresheet used to capture the results of the Summer and Winter MMPL seasons.',
    subtitle: 'What you should know',
    subDescription: [
      'As a non-profit organisation, the MMPL is required to maintain records of its membership.',
      'Your personal details will not be shared with any third parties without your permission.',
      'Season fees are agreed at the pre-season captains and delegates meeting and are due no later than the fourth week of the season.',
      'All members must sign the violence and agression policy agreement.',
      'The publicity disclaimer is optional.',
    ],
  },
];

export default documents;
