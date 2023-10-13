interface EngagementDetails {
  [propName: string]: {
    engagement_type: string
    ui_additional_detail?: string
  }
}

export const engagementDetails: EngagementDetails = {
  'settings.interface.colorMode': {
    engagement_type: 'general',
  },
  'settings.interface.fontSize': {
    engagement_type: 'general',
  },
  'settings.interface.themeColor': {
    engagement_type: 'general',
  },
  'header.signup': {
    engagement_type: 'general',
  },
  'header.login': {
    engagement_type: 'general',
  },
  'nav.signup': {
    engagement_type: 'general',
  },
  'nav.login': {
    engagement_type: 'general',
  },
}
