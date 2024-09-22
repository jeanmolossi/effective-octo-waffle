const topLevelSettingRedirects = ['/domains', '/webhooks']

export const isTopLevelSettingsRedirect = (path: string) => {
	return (
		topLevelSettingRedirects.includes(path) ||
		topLevelSettingRedirects.some(redir => path.startsWith(`${redir}/`))
	)
}
