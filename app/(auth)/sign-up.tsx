import * as React from "react"
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native"
import { useSignUp } from "@clerk/clerk-expo"
import { Link, useRouter } from "expo-router"
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState("hankins.tt2@gmail.com")
  const [password, setPassword] = React.useState("Password2tt")
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState("")

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    console.log(emailAddress, password)

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace("/")
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <>
        <Text>Verify your email</Text>
        <TextInput value={code} placeholder="Enter your verification code" onChangeText={(code) => setCode(code)} />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </>
    )
  }

  return (
    <ThemedView style={styles.container}>
      <>
        <ThemedText type="title">Sign up</ThemedText>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
        />
        <TextInput
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity onPress={onSignUpPress}>
          <ThemedText>Continue</ThemedText>
        </TouchableOpacity>
        <ThemedView style={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <ThemedText>Already have an account?</ThemedText>
          <Link href="/sign-in">
            <ThemedText type="link">Sign in</ThemedText>
          </Link>
        </ThemedView>
      </>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
