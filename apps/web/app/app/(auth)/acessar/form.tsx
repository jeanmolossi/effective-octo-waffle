import GoogleButton from "./google-button";

export default function LoginForm() {
	const inputClassName = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

	return (
		<form className="flex flex-col gap-2">
			<label htmlFor="email">Email:</label>
			<input className={inputClassName} id="email" name="email" type="email" required />

			<label htmlFor="password">Senha:</label>
			<input className={inputClassName} id="password" name="password" type="password" required />

			<GoogleButton />
		</form>
	)
}
