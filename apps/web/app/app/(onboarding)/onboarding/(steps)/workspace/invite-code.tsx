import { Label, Input } from '@effective-octo-waffle/ui'
import { Suspense } from 'react'
import PendingInvites from './pending-invites'
import { Loader2 } from 'lucide-react'

export default function InviteCode({
	inviteCode = null,
}: {
	inviteCode: string | null
}) {
	return (
		<div className="space-y-4">
			{!inviteCode && (
				<Suspense fallback={<SearchingInvites />}>
					<PendingInvites />
				</Suspense>
			)}

			<div className="mb-4 animate-slide-up-fade [animation-delay:100ms] [animation-duration:1s] [animation-fill-mode:both]">
				<Label>
					Codigo de convite <span className="text-red-500">*</span>
				</Label>
				<Input
					placeholder="7c6c6e88b17f0c20c95f54c7d6986ab7ab7d9eeb04e8803352ddeaea48015a39"
					defaultValue={inviteCode || undefined}
					required
				/>
				<small className="italic text-muted-foreground">
					Você recebe o código acima via e-mail
				</small>
			</div>
		</div>
	)
}

function SearchingInvites() {
	return (
		<div className="mb-4 flex items-center gap-2 italic animate-slide-up-fade [animation-duration:300ms]">
			<Loader2 className="animate-spin" />
			Procurando convites...
		</div>
	)
}
