import { fetcher } from '@effective-octo-waffle/utils'
import { useParams, useSearchParams } from 'next/navigation'
import useSwr from 'swr'

const DEDUP_INTERVAL = 60000 // 1min

export default function useWorkspace() {
	let { slug } = useParams() as { slug: string | null }
	const searchParams = useSearchParams()
	if (!slug) {
		slug = searchParams.get('slug') || searchParams.get('workspace')
	}

	const {
		data: workspace,
		error,
		mutate,
	} = useSwr<any>(slug && `/api/workspaces/${slug}`, fetcher, {
		dedupingInterval: DEDUP_INTERVAL,
	})

	return {
		...workspace,
		error,
		mutate,
		loading: slug && !workspace && !error ? true : false,
	}
}
