"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInDefaultValues } from "@/lib/constants"
import Link from "next/link"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { signInWithCredentials } from "@/lib/actions/user.actions"
import { useSearchParams } from "next/navigation"

const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  })

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const SignInButton = () => {
    const { pending } = useFormStatus()

    return (
      <Button
        disabled={pending}
        className="w-full cursor-pointer"
        variant="default"
      >
        {pending ? "Signing In..." : "Sign In"}
      </Button>
    )
  }

  return (
    <form action={action}>
      <div className="space-y-6">
        {data && !data.success && data.message && (
          <div className="text-center text-destructive px-2 py-2 w-full rounded-sm bg-red-300 border border-destructive">
            {data.message}
          </div>
        )}

        <input type="hidden" name="callbackUrl" value={callbackUrl} />

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={signInDefaultValues.email}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="password"
            defaultValue={signInDefaultValues.password}
          />
        </div>
        <div>
          <SignInButton />
        </div>

        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" target="_self" className="link">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  )
}

export default CredentialsSignInForm
