# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e6]:
      - generic [ref=e7]:
        - img [ref=e9]
        - heading "Login or Sign Up" [level=1] [ref=e11]
        - paragraph [ref=e12]: Welcome back! Enter your details to continue
      - generic [ref=e14]:
        - generic [ref=e15]:
          - heading "Sign in to your account" [level=2] [ref=e16]
          - paragraph [ref=e17]: Enter your email to receive a magic link
        - generic [ref=e18]:
          - textbox "Enter your email" [active] [ref=e20]: jeffdoht
          - button "Send Magic Link" [ref=e21]
      - paragraph [ref=e23]:
        - text: By continuing, you agree to our
        - link "Terms of Service" [ref=e24] [cursor=pointer]:
          - /url: "#"
        - text: and
        - link "Privacy Policy" [ref=e25] [cursor=pointer]:
          - /url: "#"
    - generic [ref=e29]: Secure authentication
  - button "Open Next.js Dev Tools" [ref=e35] [cursor=pointer]:
    - img [ref=e36] [cursor=pointer]
  - alert [ref=e39]
```