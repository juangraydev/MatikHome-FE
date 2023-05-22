// Response constants
export const TOKEN = 'TOKEN'
export const DEFAULT_PAGE = 'DEFAULT_PAGE'
export const SI = 'si'
export const DEV = 'dev'
export const NONBUSOUKA = 'nbp'
export const USER_ROLE_MENU = {
	1: [
		{
			title: 'emailDestination',
			link: '/admin/email-destination',
		},
	],
	2: [
		{
			title: 'emailDestination',
			link: '/admin/email-destination',
			type: 'email-destination',
		},
		{
			title: 'organizationMaster',
			link: '/admin/organization-configuration',
			type: 'organization-configuration',
		},
		{
			title: 'informationBoard',
			link: '/admin/information-board',
			type: 'information-board',
		},
		{
			title: 'emailContent',
			link: '/admin/email-content',
			type: 'email-content',
		},
		{
			title: 'emailSend',
			link: '/admin/email-autosend-setting',
			type: 'email-autosend-setting',
		},
		{
			title: 'totalEffectConfiguration',
			link: '/admin/total-effect-configuration',
			type: 'total-effect-configuration',
		},
	],
}
export const AUTOSEND_NOTIFICATIONS = [
	{
		type: 'error',
		from: 'modify',
		component: 'autosend',
		message: 'errorModifyOne',
	},
	{
		type: 'error',
		from: 'modify',
		component: 'autosend',
		message: 'errorModifyMany',
	},
	{
		type: 'error',
		from: 'delete',
		component: 'autosend',
		message: 'errorDeleteNone',
	},
	{
		type: 'error',
		from: 'add/modify',
		component: 'autosend',
		message: 'errorDate',
	},
	{
		type: 'success',
		from: 'add',
		component: 'autosend',
		message: 'successAdd',
	},
	{
		type: 'success',
		from: 'modify',
		component: 'autosend',
		message: 'successModify',
	},
	{
		type: 'success',
		from: 'delete',
		component: 'autosend',
		message: 'successDelete',
	},
	{
		type: 'error',
		from: 'add',
		component: 'autosend',
		message: 'errorAddGeneric',
	},
	{
		type: 'error',
		from: 'modify',
		component: 'autosend',
		message: 'errorModifyGeneric',
	},
]
export const EMAIL_CONTENT_NOTIFICATIONS = [
	{
		type: 'success',
		from: 'modify',
		component: 'emailcontent',
		message: 'successEditAlarm',
	},
	{
		type: 'success',
		from: 'modify',
		component: 'emailcontent',
		message: 'successEditRequest',
	},
	{
		type: 'error',
		from: 'modify',
		component: 'emailcontent',
		message: 'errorEditAlarm',
	},
	{
		type: 'error',
		from: 'modify',
		component: 'emailcontent',
		message: 'errorEditRequest',
	},
]
export const USER_ROLE_MENU_NOT_ALLOWED = {
	1: [
		{
			title: 'organizationMaster',
			link: '/admin/organization-configuration',
		},
		{
			title: 'informationBoard',
			link: '/admin/information-board',
		},
		{
			title: 'emailContent',
			link: '/admin/email-content',
		},
		{
			title: 'emailSend',
			link: '/admin/email-autosend-setting',
		},
	],
	0: [
		{
			title: 'emailDestination',
			link: '/admin/email-destination',
		},
		{
			title: 'organizationMaster',
			link: '/admin/organization-configuration',
		},
		{
			title: 'informationBoard',
			link: '/admin/information-board',
		},
		{
			title: 'emailContent',
			link: '/admin/email-content',
		},
		{
			title: 'emailSend',
			link: '/admin/email-autosend-setting',
		},
	],
}
export const ORG_MASTER_EMPTY_FIELD = 9999999999
export const DECIMAL = "decimal"
export const SUMMARY = "summary"
export const TOTAL = "total"
export const DATA = "data";
export const FIRST_HALF_LABEL = "上期"
export const NUM_MONTHS = 12
export const START_MONTH = 4
export const DEFAULT_FH_CONCLUSION = 9
export const END_MONTH = 3