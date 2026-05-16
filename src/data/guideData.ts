import { GuideService } from '../types';

export const GUIDES: GuideService[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    domain: 'facebook.com',
    iconBg: '#1877F2',
    steps: [
      {
        id: 1,
        title: 'Log in to your Facebook account',
        summary: 'Go to your Facebook profile. Go to Settings & Privacy. Choose the settings tab.',
        detail:
          'Open Facebook on your browser or mobile app. Click on your profile picture in the top right corner. Select Settings & Privacy from the dropdown menu, then click Settings. This will open your account settings page.',
        image: 'open_settings',
      },
      {
        id: 2,
        title: 'Locate 2FA settings',
        summary:
          'Choose the Security and login tab, scroll down to Use two-factor authentication and click on Edit.',
        detail:
          'In the left sidebar of Settings, click on Security and Login. Scroll down until you find the Two-Factor Authentication section. Click the Edit button next to Use two-factor authentication.',
        image: 'navigate_security',
      },
      {
        id: 3,
        title: 'Set up Two-Factor Authentication',
        summary: 'Click Use Authenticator App. Next, confirm your Facebook password.',
        detail:
          'Facebook will show you authentication methods. Select Authentication App as your preferred method. You will be prompted to enter your Facebook password to confirm your identity before proceeding.',
      },
      {
        id: 4,
        title: 'Scan QR Code',
        summary:
          'A pop-up window will appear for you to scan the QR code with the Authenticator App.',
        detail:
          'Facebook will display a QR code on screen. Keep this browser window open. Open this Authenticator App on your phone, tap the + button, select Scan QR Code, and point your camera at the QR code on your computer screen.',
        image: 'qr_scan',
      },
      {
        id: 5,
        title: 'Save Account',
        summary:
          'After scanning, the Authenticator App will automatically choose the Facebook logo and auto-fill the account.',
        detail:
          'Once the QR code is scanned successfully, this app will automatically detect Facebook and create the account entry. You will see Facebook appear in your accounts list with a 6-digit code.',
      },
      {
        id: 6,
        title: 'Enter the Two-Factor Authentication Code',
        summary: 'Copy the Facebook numerical token. This code updates every 30 seconds.',
        detail:
          'Copy the 6-digit code shown in this Authenticator App. Return to Facebook and click Next. Paste or type the 6-digit code in the field provided. The code refreshes every 30 seconds so act quickly. Click Continue when done.',
        image: 'enter_code',
      },
      {
        id: 7,
        title: 'Save Backup Codes — You are all set!',
        summary:
          'You will now be shown your Facebook backup codes. Each code can only be used once.',
        detail:
          "Facebook will show you 10 backup codes. Save these codes in a safe place — you can use them to log in if you lose access to your authenticator app. Each backup code can only be used once. Your account is now protected with 2FA.",
        image: 'backup_codes',
      },
    ],
  },
  {
    id: 'google',
    name: 'Google',
    domain: 'google.com',
    iconBg: '#4285F4',
    steps: [
      {
        id: 1,
        title: 'Log in to your Google account',
        summary: 'Click on your account icon at the top right. Then click Manage your Google Account.',
        detail:
          'Go to google.com or gmail.com and sign in. Click your profile picture or initial in the top-right corner. Select Manage your Google Account from the dropdown. This opens your Google Account dashboard.',
        image: 'open_settings',
      },
      {
        id: 2,
        title: 'Enable 2FA settings',
        summary: 'Tap on Security, then press on 2-step Verification in the Security section.',
        detail:
          'In your Google Account, click on the Security tab in the top navigation or left sidebar. Scroll down to find the How you sign in to Google section. Click on 2-Step Verification.',
        image: 'navigate_security',
      },
      {
        id: 3,
        title: 'Confirm Password',
        summary: 'Click on GET STARTED. You will need to re-enter your Google password.',
        detail:
          'Click the Get started button. Google will ask you to verify your identity. Enter your Google account password and click Next to continue the 2FA setup process.',
      },
      {
        id: 4,
        title: 'Confirm and verify your phone number',
        summary:
          'Enter your phone number to receive a verification code. Enter the 6-digit code sent to you.',
        detail:
          'Enter your phone number and choose SMS or voice call. Click Send. Google will send a 6-digit verification code to your phone. Enter this code on the verification page and click Next to proceed.',
      },
      {
        id: 5,
        title: 'Turn on verification',
        summary: 'Click on Turn On and then tap the authenticator app option.',
        detail:
          "Google will show that 2-Step Verification is now active. Click Turn On to confirm. You will see options for your second factor. Look for and click on Authenticator app to set up TOTP-based 2FA.",
      },
      {
        id: 6,
        title: 'Set up Two-Factor Authentication',
        summary: 'For setting up, tap on Set up authenticator.',
        detail:
          'Google will show the Authenticator app setup page. Click Set up authenticator. Select your phone type (Android or iPhone) and click Next. Google will display a QR code for you to scan.',
      },
      {
        id: 7,
        title: 'QR Code',
        summary: 'A pop-up window will appear. Scan the QR code with this Authenticator App.',
        detail:
          'Keep the Google QR code page open on your computer. Open this Authenticator App, tap the + button at the bottom right, select Scan QR Code, and scan the barcode shown on your Google account page.',
        image: 'qr_scan',
      },
      {
        id: 8,
        title: 'Verify 2FA code',
        summary: 'Copy the code from this app and confirm it on Google by clicking Verify.',
        detail:
          'After scanning, this app will show a 6-digit code for your Google account. Enter this code on the Google verification page and click Verify. Remember the code refreshes every 30 seconds.',
        image: 'enter_code',
      },
      {
        id: 9,
        title: 'You are all set!',
        summary: 'Your Google 2FA is now active. Use authentication codes when logging in.',
        detail:
          "Google 2-Step Verification is now enabled with the Authenticator App. From now on, when you sign in to Google, you will be asked for your password and a 6-digit code from this app. You can turn off 2FA anytime from your Google Security settings.",
        image: 'success',
      },
    ],
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    domain: 'snapchat.com',
    iconBg: '#FFFC00',
    steps: [
      {
        id: 1,
        title: 'Open Snapchat Settings',
        summary: 'Tap your profile icon, then tap the gear icon to open Settings.',
        detail:
          'Open the Snapchat app on your phone. Tap your Bitmoji or profile icon in the top-left corner. Tap the gear icon in the top-right corner to access your account settings.',
        image: 'open_settings',
      },
      {
        id: 2,
        title: 'Navigate to Two-Factor Authentication',
        summary: 'Scroll down and tap on Two-Factor Authentication under the My Account section.',
        detail:
          "Scroll through the Settings menu until you find the My Account section. Tap on Two-Factor Authentication. Snapchat will explain what 2FA is and ask you to continue.",
        image: 'navigate_security',
      },
      {
        id: 3,
        title: 'Choose Authentication App',
        summary: 'Tap Continue and select Authentication App as your 2FA method.',
        detail:
          "Tap Continue on the 2FA introduction screen. Snapchat will show you two options: SMS and Authentication App. Select Authentication App for better security.",
      },
      {
        id: 4,
        title: 'Scan the QR Code',
        summary: "Snapchat shows a QR code — scan it with this app's scanner.",
        detail:
          "Snapchat will display a QR code. Open this Authenticator App, tap the + button, choose Scan QR Code, and point your camera at Snapchat's QR code. The account will be added automatically.",
        image: 'qr_scan',
      },
      {
        id: 5,
        title: 'Enter Verification Code',
        summary: 'Enter the 6-digit code shown in this app into Snapchat to verify.',
        detail:
          'After scanning, note the 6-digit code shown in this Authenticator App for Snapchat. Go back to Snapchat and enter this code in the verification field. Tap Verify to confirm setup.',
        image: 'enter_code',
      },
      {
        id: 6,
        title: 'Save Recovery Code',
        summary: 'Snapchat provides a recovery code — save it in a safe place.',
        detail:
          "Snapchat will display a recovery code. Write it down or save it securely. This code lets you regain access if you lose your phone. Tap I've saved my recovery code to complete the setup.",
        image: 'backup_codes',
      },
    ],
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    domain: 'linkedin.com',
    iconBg: '#0A66C2',
    steps: [
      {
        id: 1,
        title: 'Open LinkedIn Settings',
        summary: 'Click your profile picture, then click Settings & Privacy.',
        detail:
          "Visit linkedin.com and sign in. Click your profile photo or the Me icon at the top of your LinkedIn homepage. Select Settings & Privacy from the dropdown menu.",
        image: 'open_settings',
      },
      {
        id: 2,
        title: 'Navigate to Security',
        summary: 'Click the Sign In & Security tab, then find Two-step verification.',
        detail:
          "In Settings & Privacy, click on the Sign in & security tab on the left side. Scroll down to find the Two-step verification section and click Set up.",
        image: 'navigate_security',
      },
      {
        id: 3,
        title: 'Select Authenticator App',
        summary: 'Choose Authenticator App as your verification method and click Continue.',
        detail:
          "LinkedIn will show you verification options. Select Authenticator App and click Continue. LinkedIn may ask you to confirm your current password before proceeding.",
      },
      {
        id: 4,
        title: 'Scan the QR Code',
        summary: 'Scan the QR code shown on LinkedIn using this Authenticator App.',
        detail:
          "LinkedIn will display a QR code. Open this Authenticator App, tap the + button, choose Scan QR Code, and scan LinkedIn's QR code. Your LinkedIn account will be added.",
        image: 'qr_scan',
      },
      {
        id: 5,
        title: 'Enter Verification Code',
        summary: 'Enter the 6-digit code from this app into LinkedIn to verify setup.',
        detail:
          "Open this app and find the 6-digit code for LinkedIn. Enter this code in the LinkedIn verification field and click Verify. The code refreshes every 30 seconds.",
        image: 'enter_code',
      },
      {
        id: 6,
        title: 'Two-Step Verification Enabled',
        summary: 'LinkedIn confirms 2FA is active. You are now protected.',
        detail:
          "LinkedIn will confirm that Two-step verification is now enabled. From now on, when you sign in to LinkedIn from an unrecognized device, you will need to enter a code from this app.",
        image: 'success',
      },
    ],
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    domain: 'twitter.com',
    iconBg: '#1DA1F2',
    steps: [
      {
        id: 1,
        title: 'Open Twitter Security Settings',
        summary: 'Go to Settings > Security and account access > Security.',
        detail:
          "Open Twitter (X) and click the More icon in the left sidebar. Click Settings and Support, then Settings and privacy. Navigate to Security and account access, then Security.",
        image: 'open_settings',
      },
      {
        id: 2,
        title: 'Enable Two-factor authentication',
        summary: 'Tap on Two-factor authentication and select Authentication app.',
        detail:
          "In the Security section, tap on Two-factor authentication. Twitter will show you three options. Select Authentication app for the most secure option.",
        image: 'navigate_security',
      },
      {
        id: 3,
        title: 'Get the Authentication App',
        summary: 'Twitter generates a QR code for you to scan with this app.',
        detail:
          "Twitter will display a QR code and a setup key. Keep this page open. Open this Authenticator App, tap the + button, and choose Scan QR Code to scan the Twitter QR code.",
        image: 'qr_scan',
      },
      {
        id: 4,
        title: 'Enter the confirmation code',
        summary: 'Copy the 6-digit code from this app and enter it on Twitter.',
        detail:
          "After scanning, find the 6-digit code for Twitter in this app. Return to Twitter and enter the code in the verification field. Click Verify to confirm.",
        image: 'enter_code',
      },
      {
        id: 5,
        title: 'Save your backup code',
        summary: "Twitter gives you a backup code — save it somewhere safe.",
        detail:
          "Twitter will provide a backup code. Copy or write this code down and store it safely. You can use this code to access your account if you ever lose your authenticator app. Click Got it to finish.",
        image: 'backup_codes',
      },
    ],
  },
  {
    id: 'instagram',
    name: 'Instagram',
    domain: 'instagram.com',
    iconBg: '#E1306C',
    steps: [
      {
        id: 1,
        title: 'Open Instagram Profile',
        summary: 'Tap your profile picture, then tap the menu icon (three lines) in the top right.',
        detail:
          'Open Instagram on your phone. Tap your profile picture at the bottom right. Tap the three horizontal lines (hamburger menu) in the top right corner of your profile.',
        image: 'open_settings',
      },
      {
        id: 2,
        title: 'Go to Settings and Security',
        summary: 'Tap Settings > Security > Two-Factor Authentication.',
        detail:
          "Tap on Settings at the bottom of the menu. Then tap on Security. In the Security menu, find and tap on Two-Factor Authentication.",
        image: 'navigate_security',
      },
      {
        id: 3,
        title: 'Choose Authentication App',
        summary: 'Tap Get Started, then select Authentication App.',
        detail:
          "Instagram will explain 2FA. Tap Get Started. Choose Authentication App from the options. Instagram may ask you to confirm your password before continuing.",
      },
      {
        id: 4,
        title: 'Scan the QR Code',
        summary: 'Instagram shows a QR code — scan it with this Authenticator App.',
        detail:
          "Instagram will display a QR code. Open this Authenticator App, tap the + button, select Scan QR Code, and scan the Instagram QR code. Your account will be added instantly.",
        image: 'qr_scan',
      },
      {
        id: 5,
        title: 'Enter Confirmation Code',
        summary: 'Enter the 6-digit code from this app to confirm the setup.',
        detail:
          "Find the 6-digit code for Instagram in this app. Return to Instagram and type the code in the field provided. Tap Next or Done to verify and complete the setup.",
        image: 'enter_code',
      },
      {
        id: 6,
        title: 'Save Backup Codes',
        summary: 'Instagram provides backup codes — save them securely.',
        detail:
          "Instagram will display backup codes. Tap Copy All to save them, or write them down. These codes let you access your account if you lose your phone. Tap Done to finish.",
        image: 'backup_codes',
      },
    ],
  },
  {
    id: 'github',
    name: 'GitHub',
    domain: 'github.com',
    iconBg: '#181717',
    steps: [
      {
        id: 1,
        title: 'Open GitHub Settings',
        summary: 'Click your profile avatar, then click Settings.',
        detail:
          "Go to github.com and sign in. Click your profile photo in the top-right corner. Select Settings from the dropdown menu to open your account settings.",
        image: 'open_settings',
      },
      {
        id: 2,
        title: 'Navigate to Password and Authentication',
        summary: 'In the sidebar, click Password and authentication.',
        detail:
          "In the left sidebar of Settings, scroll down and click on Password and authentication. This section contains all security settings including 2FA options.",
        image: 'navigate_security',
      },
      {
        id: 3,
        title: 'Enable Two-Factor Authentication',
        summary: 'Click Enable two-factor authentication.',
        detail:
          "Find the Two-factor authentication section. Click the Enable two-factor authentication button. GitHub will ask you to confirm your password to continue.",
      },
      {
        id: 4,
        title: 'Set up using an app',
        summary: 'Choose Set up using an app and scan the QR code.',
        detail:
          "GitHub will show a QR code under the Set up using an app option. Open this Authenticator App, tap the + button, select Scan QR Code, and scan the GitHub QR code.",
        image: 'qr_scan',
      },
      {
        id: 5,
        title: 'Enter Authentication Code',
        summary: 'Enter the 6-digit code from this app to verify setup.',
        detail:
          "Open this app and find the 6-digit code for GitHub. Enter this code in the Verify the code from the app field on GitHub. Click Enable to complete the verification.",
        image: 'enter_code',
      },
      {
        id: 6,
        title: 'Download Recovery Codes',
        summary: 'Save your recovery codes before leaving this page.',
        detail:
          "GitHub will display recovery codes. Click Download to save them as a file, or click Copy to copy them. Store these codes securely — they are your backup if you lose access to your authenticator app.",
        image: 'backup_codes',
      },
    ],
  },
  {
    id: 'discord',
    name: 'Discord',
    domain: 'discord.com',
    iconBg: '#5865F2',
    steps: [
      {
        id: 1,
        title: 'Open Discord User Settings',
        summary: 'Click the gear icon next to your username at the bottom left.',
        detail:
          "Open Discord on your computer or browser. Find your username at the bottom left of the screen. Click the gear icon (Settings) next to your username.",
        image: 'open_settings',
      },
      {
        id: 2,
        title: 'Go to My Account',
        summary: 'Click My Account in the left sidebar.',
        detail:
          "In User Settings, click on My Account in the left navigation panel. Scroll down to find the Two-Factor Authentication section.",
        image: 'navigate_security',
      },
      {
        id: 3,
        title: 'Enable Two-Factor Auth',
        summary: 'Click Enable Two-Factor Auth and enter your Discord password.',
        detail:
          "Click the Enable Two-Factor Auth button. Discord will ask for your account password to verify your identity. Enter your password and click Continue.",
      },
      {
        id: 4,
        title: 'Scan the QR Code',
        summary: 'Scan the QR code shown by Discord using this Authenticator App.',
        detail:
          "Discord will display a QR code. Open this Authenticator App, tap the + button, choose Scan QR Code, and scan the Discord QR code. The account will be added automatically.",
        image: 'qr_scan',
      },
      {
        id: 5,
        title: 'Enter and Activate',
        summary: 'Enter the 6-digit code from this app and click Activate.',
        detail:
          "Enter the 6-digit code shown for Discord in this app into the Discord verification field. Click Activate. Discord will show you backup codes — save them in a safe place.",
        image: 'enter_code',
      },
    ],
  },
  {
    id: 'reddit',
    name: 'Reddit',
    domain: 'reddit.com',
    iconBg: '#FF4500',
    steps: [
      {
        id: 1,
        title: 'Open Reddit User Settings',
        summary: 'Click your username at the top, then click User Settings.',
        detail:
          "Go to reddit.com and sign in. Click your username or avatar in the top right corner. Select User Settings from the dropdown menu.",
        image: 'open_settings',
      },
      {
        id: 2,
        title: 'Navigate to Privacy and Security',
        summary: 'Click the Privacy & Security tab in settings.',
        detail:
          "In User Settings, click on the Privacy & Security tab. Scroll down to find the Two-Factor Authentication section.",
        image: 'navigate_security',
      },
      {
        id: 3,
        title: 'Enable Two-Factor Authentication',
        summary: 'Click the Enable button next to Two-Factor Authentication.',
        detail:
          "Find Two-Factor Authentication in the security section. Click Enable. Reddit will ask you to re-enter your password to verify your identity.",
      },
      {
        id: 4,
        title: 'Scan QR Code',
        summary: 'Scan the QR code shown by Reddit with this Authenticator App.',
        detail:
          "Reddit will display a QR code. Open this Authenticator App, tap + to add an account, choose Scan QR Code, and scan Reddit's QR code. The account is added automatically.",
        image: 'qr_scan',
      },
      {
        id: 5,
        title: 'Enter Verification Code',
        summary: 'Type the 6-digit code from this app into Reddit and click Verify.',
        detail:
          "Find the current 6-digit code for Reddit in this app. Type it into Reddit's verification field and click Verify. Reddit will show backup codes — save them before closing.",
        image: 'enter_code',
      },
    ],
  },
  {
    id: 'twitch',
    name: 'Twitch',
    domain: 'twitch.tv',
    iconBg: '#9146FF',
    steps: [
      {
        id: 1,
        title: 'Open Twitch Security Settings',
        summary: 'Click your avatar, then go to Settings > Security and Privacy.',
        detail:
          "Go to twitch.tv and sign in. Click your profile avatar in the top right. Select Settings from the dropdown. Click on the Security and Privacy tab.",
        image: 'open_settings',
      },
      {
        id: 2,
        title: 'Set Up Two-Factor Authentication',
        summary: 'Click Set Up Two-Factor Authentication.',
        detail:
          "Scroll down to the Security section. Click Set Up Two-Factor Authentication. Twitch will first ask you to verify your phone number if you haven't already.",
        image: 'navigate_security',
      },
      {
        id: 3,
        title: 'Enable Authentication App',
        summary: 'After phone verification, select use an authenticator app.',
        detail:
          "Twitch will guide you through SMS verification first. Once your phone is verified, scroll down and look for the option to use an authenticator app. Click Enable.",
      },
      {
        id: 4,
        title: 'Scan the QR Code',
        summary: 'Scan the QR code shown by Twitch with this Authenticator App.',
        detail:
          "Twitch will display a QR code. Open this Authenticator App, tap the + button, choose Scan QR Code, and scan the Twitch QR code. Your Twitch account will be added.",
        image: 'qr_scan',
      },
      {
        id: 5,
        title: 'Verify and Complete',
        summary: 'Enter the 6-digit code from this app to finish Twitch 2FA setup.',
        detail:
          "Enter the 6-digit code shown for Twitch in this app into the Twitch verification field. Click Confirm. Twitch will confirm that 2FA is now enabled for your account.",
        image: 'enter_code',
      },
    ],
  },
  {
    id: 'tesla',
    name: 'Tesla',
    domain: 'tesla.com',
    iconBg: '#CC0000',
    steps: [
      {
        id: 1,
        title: 'Open Tesla App Settings',
        summary: 'Open the Tesla app, tap your profile icon, then go to Security.',
        detail:
          "Open the Tesla app on your phone. Tap the profile or account icon, usually found in the menu or top corner. Navigate to the Security section in your account settings.",
        image: 'open_settings',
      },
      {
        id: 2,
        title: 'Enable Two-Factor Authentication',
        summary: 'Tap Two-Factor Authentication and select Authenticator App.',
        detail:
          "In Security settings, find the Two-Factor Authentication option. Tap on it. Tesla will present options — select Authenticator App for TOTP-based 2FA.",
        image: 'navigate_security',
      },
      {
        id: 3,
        title: 'Scan the QR Code',
        summary: 'Tesla shows a QR code — scan it with this Authenticator App.',
        detail:
          "Tesla will display a QR code on screen. Open this Authenticator App, tap + to add an account, select Scan QR Code, and scan the Tesla QR code.",
        image: 'qr_scan',
      },
      {
        id: 4,
        title: 'Enter Verification Code',
        summary: 'Enter the 6-digit code from this app to verify the setup.',
        detail:
          "Note the 6-digit code shown for Tesla in this app. Enter it into the Tesla verification field. Tap Verify or Confirm to complete the setup.",
        image: 'enter_code',
      },
      {
        id: 5,
        title: 'Two-Factor Authentication Active',
        summary: 'Tesla confirms 2FA is enabled. Your account is now secured.',
        detail:
          "Tesla will confirm that Two-Factor Authentication is now enabled. Save any backup codes provided. From now on, signing in to your Tesla account will require a code from this app.",
        image: 'success',
      },
    ],
  },
  {
    id: 'epicgames',
    name: 'Epic Games',
    domain: 'epicgames.com',
    iconBg: '#313131',
    steps: [
      {
        id: 1,
        title: 'Log in to Epic Games Account',
        summary: 'Go to epicgames.com and sign in to your account.',
        detail:
          "Open your browser and go to epicgames.com. Click Sign In in the top right corner. Enter your email and password to log into your Epic Games account.",
        image: 'open_settings',
      },
      {
        id: 2,
        title: 'Open Account Settings',
        summary: 'Click your name at the top, then click Account.',
        detail:
          "After signing in, click on your display name in the top right. Select Account from the dropdown. This opens your Epic Games account page.",
      },
      {
        id: 3,
        title: 'Enable 2FA',
        summary: 'Click the Password & Security tab, then enable Authenticator App 2FA.',
        detail:
          "In your Account page, click on the Password & Security tab. Scroll down to the Two-Factor Authentication section. Find Authenticator App 2FA and click Enable.",
        image: 'navigate_security',
      },
      {
        id: 4,
        title: 'Scan the QR Code',
        summary: 'Epic Games shows a QR code — scan it with this Authenticator App.',
        detail:
          "Epic will display a QR code and a manual setup key. Open this Authenticator App, tap + to add an account, choose Scan QR Code, and scan Epic's QR code.",
        image: 'qr_scan',
      },
      {
        id: 5,
        title: 'Enter Code and Activate',
        summary: 'Enter the 6-digit code from this app and click Activate.',
        detail:
          "Enter the 6-digit code shown for Epic Games in this app into the activation field. Click Activate. Epic will confirm 2FA is enabled and remind you to save your backup codes.",
        image: 'enter_code',
      },
    ],
  },
  {
    id: 'protonmail',
    name: 'Proton Mail',
    domain: 'proton.me',
    iconBg: '#6D4AFF',
    steps: [
      {
        id: 1,
        title: 'Open Proton Account Settings',
        summary: 'Click Settings in the top right of ProtonMail, then go to Account.',
        detail:
          "Sign in to your ProtonMail account. Click on the Settings icon (gear icon) in the top right. In the Settings menu, click on Account to access account-level settings.",
        image: 'open_settings',
      },
      {
        id: 2,
        title: 'Find Two-Factor Authentication',
        summary: 'Scroll to the Password & Recovery section and find 2FA.',
        detail:
          "In Account settings, scroll down to the Password & Recovery section. Find the Two-Factor Authentication option and click Set Up.",
        image: 'navigate_security',
      },
      {
        id: 3,
        title: 'Scan the QR Code',
        summary: 'Proton shows a QR code — scan it with this Authenticator App.',
        detail:
          "Proton will display a QR code and a secret key. Open this Authenticator App, tap + to add an account, select Scan QR Code, and scan the Proton QR code.",
        image: 'qr_scan',
      },
      {
        id: 4,
        title: 'Enter the 2FA Code',
        summary: 'Enter the 6-digit code from this app to verify.',
        detail:
          "Find the 6-digit code for ProtonMail in this app. Enter it in the Proton verification field. Click Submit or Enable to confirm the setup.",
        image: 'enter_code',
      },
      {
        id: 5,
        title: '2FA Enabled Successfully',
        summary: 'Proton confirms 2FA is active. Your email is now more secure.',
        detail:
          "Proton will confirm that two-factor authentication is now enabled. Your ProtonMail account now requires a code from this app every time you sign in, making it significantly more secure.",
        image: 'success',
      },
    ],
  },
  {
    id: 'evernote',
    name: 'Evernote',
    domain: 'evernote.com',
    iconBg: '#00A82D',
    steps: [
      {
        id: 1,
        title: 'Open Evernote Security Settings',
        summary: 'Click your profile, then go to Account Summary > Security.',
        detail:
          "Sign in to evernote.com. Click your profile icon in the top left of the web app. Select Account Info or Account Summary. Then click Security to access 2FA settings.",
        image: 'open_settings',
      },
      {
        id: 2,
        title: 'Enable Two-Step Verification',
        summary: 'Click Enable next to Two-Step Verification.',
        detail:
          "In Security settings, find Two-Step Verification. Click Enable. Evernote will ask for your account password to verify your identity before continuing.",
        image: 'navigate_security',
      },
      {
        id: 3,
        title: 'Choose Authentication App',
        summary: 'Select Use an authenticator app and follow the instructions.',
        detail:
          "Evernote will show you setup options. Select the option to use an authenticator app. Evernote will generate a QR code for you to scan.",
      },
      {
        id: 4,
        title: 'Scan the QR Code',
        summary: 'Scan the Evernote QR code with this Authenticator App.',
        detail:
          "Evernote will display a QR code. Open this Authenticator App, tap the + button, choose Scan QR Code, and scan the QR code. Your Evernote account will be added.",
        image: 'qr_scan',
      },
      {
        id: 5,
        title: 'Verify and Save Backup Codes',
        summary: 'Enter the code from this app, then save your backup codes.',
        detail:
          "Enter the 6-digit code shown for Evernote in this app. Click Verify. Evernote will provide backup codes — save these codes securely. Click Done to complete setup.",
        image: 'backup_codes',
      },
    ],
  },
  {
    id: 'playstation',
    name: 'PlayStation',
    domain: 'playstation.com',
    iconBg: '#003791',
    steps: [
      {
        id: 1,
        title: 'Sign in to PlayStation Account',
        summary: 'Go to account.sonyentertainmentnetwork.com and sign in.',
        detail:
          "Open your browser and go to account.sonyentertainmentnetwork.com or the PlayStation website. Sign in with your PlayStation Network credentials.",
        image: 'open_settings',
      },
      {
        id: 2,
        title: 'Open Security Settings',
        summary: 'Click Security in the left sidebar of your account page.',
        detail:
          "After signing in, look at the left navigation panel. Click on Security. This will take you to the security settings for your PlayStation account.",
        image: 'navigate_security',
      },
      {
        id: 3,
        title: 'Enable 2-Step Verification',
        summary: 'Click Edit next to 2-Step Verification and select Authenticator App.',
        detail:
          "Find the 2-Step Verification section. Click Edit or Setup. Sony will give you options. Select Authenticator App as your preferred 2FA method.",
      },
      {
        id: 4,
        title: 'Scan the QR Code',
        summary: 'Scan the PlayStation QR code with this Authenticator App.',
        detail:
          "PlayStation will display a QR code. Open this Authenticator App, tap + to add a new account, select Scan QR Code, and scan the PlayStation QR code.",
        image: 'qr_scan',
      },
      {
        id: 5,
        title: 'Enter Verification Code',
        summary: 'Enter the 6-digit code from this app to confirm.',
        detail:
          "Enter the 6-digit code shown for PlayStation in this app into the verification field on the Sony website. Click Activate to complete 2FA setup.",
        image: 'enter_code',
      },
      {
        id: 6,
        title: 'Save Backup Codes',
        summary: 'Sony provides backup codes — save them before finishing.',
        detail:
          "Sony will display backup codes that you can use if you lose access to your authenticator app. Print or write down these codes and store them safely. Click Done to finish.",
        image: 'backup_codes',
      },
    ],
  },
  {
    id: 'avast',
    name: 'Avast',
    domain: 'avast.com',
    iconBg: '#FF7800',
    steps: [
      {
        id: 1,
        title: 'Sign in to Avast Account',
        summary: 'Go to my.avast.com and sign in to your account.',
        detail:
          "Open your browser and navigate to my.avast.com. Click Sign In and enter your Avast account email and password.",
        image: 'open_settings',
      },
      {
        id: 2,
        title: 'Open Account Security',
        summary: 'Click on Security settings in your Avast account.',
        detail:
          "Once signed in, look for the Account or Security section in your Avast account dashboard. Click on it to access security and authentication settings.",
        image: 'navigate_security',
      },
      {
        id: 3,
        title: 'Enable Two-Factor Authentication',
        summary: 'Find 2FA settings and click Enable or Set Up.',
        detail:
          "In security settings, find the Two-Factor Authentication section. Click Enable or Set Up. Avast will walk you through the setup process.",
      },
      {
        id: 4,
        title: 'Scan the QR Code',
        summary: 'Scan the Avast QR code with this Authenticator App.',
        detail:
          "Avast will show you a QR code. Open this Authenticator App, tap the + button, select Scan QR Code, and scan the code. Your Avast account will be added.",
        image: 'qr_scan',
      },
      {
        id: 5,
        title: 'Confirm and Finish',
        summary: 'Enter the 6-digit code from this app to complete setup.',
        detail:
          "Enter the 6-digit code shown for Avast in this app into the Avast verification field. Click Confirm or Verify. Avast will confirm that 2FA is now active on your account.",
        image: 'success',
      },
    ],
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    domain: 'dropbox.com',
    iconBg: '#0061FF',
    steps: [
      {
        id: 1,
        title: 'Open Dropbox Account Settings',
        summary: 'Click your avatar at top right, then click Settings.',
        detail:
          "Sign in to dropbox.com. Click your profile avatar or name in the top right. Select Settings from the dropdown menu to open your account settings.",
        image: 'open_settings',
      },
      {
        id: 2,
        title: 'Navigate to Security',
        summary: 'Click the Security tab in Dropbox settings.',
        detail:
          "In your Dropbox Settings, click on the Security tab. Scroll down to find the Two-step verification section.",
        image: 'navigate_security',
      },
      {
        id: 3,
        title: 'Enable Two-Step Verification',
        summary: 'Click Enable next to Two-step verification.',
        detail:
          "Click the Enable link next to Two-step verification. Dropbox will ask for your password to confirm your identity. Enter your password and click Next.",
      },
      {
        id: 4,
        title: 'Choose Mobile App',
        summary: "Select Use a mobile app and scan the QR code.",
        detail:
          "Dropbox will offer SMS or mobile app options. Select Use a mobile app. Dropbox will display a QR code. Open this Authenticator App, tap +, choose Scan QR Code, and scan it.",
        image: 'qr_scan',
      },
      {
        id: 5,
        title: 'Enter Verification Code',
        summary: 'Enter the 6-digit code from this app to enable 2FA on Dropbox.',
        detail:
          "Enter the 6-digit code shown for Dropbox in this app. Click Next on the Dropbox setup page. Dropbox will confirm that two-step verification is now enabled.",
        image: 'enter_code',
      },
    ],
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    domain: 'microsoft.com',
    iconBg: '#00A4EF',
    steps: [
      {
        id: 1,
        title: 'Sign in to Microsoft Account',
        summary: 'Go to account.microsoft.com and sign in.',
        detail:
          "Open your browser and go to account.microsoft.com. Click Sign In and enter your Microsoft email (Outlook, Hotmail, Live) and password.",
        image: 'open_settings',
      },
      {
        id: 2,
        title: 'Open Security Settings',
        summary: 'Click Security in the top navigation bar.',
        detail:
          "After signing in, click on Security in the top navigation of your Microsoft account. Then click Advanced security options to access 2FA settings.",
        image: 'navigate_security',
      },
      {
        id: 3,
        title: 'Set up Two-Step Verification',
        summary: 'Click Set up two-step verification under the Two-step section.',
        detail:
          "In Advanced security options, find Two-step verification. Click Turn on. Microsoft will walk you through a setup wizard. Click Next to proceed.",
      },
      {
        id: 4,
        title: 'Choose Authenticator App',
        summary: 'Select Use an app and follow the setup steps.',
        detail:
          "When asked how to receive codes, select Use an app. Microsoft will show a QR code. Open this Authenticator App, tap +, choose Scan QR Code, and scan the Microsoft QR code.",
        image: 'qr_scan',
      },
      {
        id: 5,
        title: 'Enter the Code',
        summary: 'Enter the 6-digit code from this app to verify.',
        detail:
          "Enter the 6-digit code shown for Microsoft in this app. Click Next on the Microsoft setup page to verify the code is working correctly.",
        image: 'enter_code',
      },
      {
        id: 6,
        title: 'Two-Step Verification Active',
        summary: 'Microsoft confirms 2FA is enabled. Keep your recovery codes safe.',
        detail:
          "Microsoft will confirm that two-step verification is now on for your account. Microsoft will also show a recovery code — write it down and store it somewhere safe. Click Finish to complete setup.",
        image: 'success',
      },
    ],
  },
  {
    id: 'binance',
    name: 'Binance',
    domain: 'binance.com',
    iconBg: '#F3BA2F',
    steps: [
      {
        id: 1,
        title: 'Log in to Binance',
        summary: 'Go to binance.com and sign in to your account.',
        detail:
          "Open your browser and go to binance.com. Click Log In in the top right corner. Enter your email and password to access your Binance account.",
        image: 'open_settings',
      },
      {
        id: 2,
        title: 'Open Account Security',
        summary: 'Click your profile icon, then go to Security.',
        detail:
          "Click on your profile icon or name in the top right. Select Security from the dropdown. This opens the security dashboard for your Binance account.",
        image: 'navigate_security',
      },
      {
        id: 3,
        title: 'Enable Google Authentication',
        summary: 'Click Enable next to Google Authentication (TOTP).',
        detail:
          "In the Security section, find Google Authentication. Click Enable. Binance uses the term Google Authentication for TOTP-based apps like this one.",
      },
      {
        id: 4,
        title: 'Scan the QR Code',
        summary: 'Scan the Binance QR code with this Authenticator App.',
        detail:
          "Binance will display a QR code and a secret key. Open this Authenticator App, tap the + button, choose Scan QR Code, and scan the Binance QR code. Save the secret key as a backup.",
        image: 'qr_scan',
      },
      {
        id: 5,
        title: 'Enter Codes and Enable',
        summary: 'Enter your login password and the 6-digit TOTP code, then click Enable.',
        detail:
          "Binance requires you to enter your login password and the 6-digit code from this app. Enter both and click Enable Google Authentication. 2FA is now active on your Binance account.",
        image: 'enter_code',
      },
    ],
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    domain: 'coinbase.com',
    iconBg: '#0052FF',
    steps: [
      {
        id: 1,
        title: 'Open Coinbase Settings',
        summary: 'Go to coinbase.com, click your profile, then Settings > Security.',
        detail:
          "Sign in to coinbase.com. Click your profile icon or name. Select Settings from the menu. In Settings, click on the Security tab.",
        image: 'open_settings',
      },
      {
        id: 2,
        title: 'Select Two-Factor Authentication',
        summary: 'Find Two-Factor Authentication and click Select.',
        detail:
          "In Security settings, find the Two-Factor Authentication section. Click the Select button or the current 2FA method to change or set it up.",
        image: 'navigate_security',
      },
      {
        id: 3,
        title: 'Choose Authenticator App',
        summary: 'Select Authenticator App from the 2FA options.',
        detail:
          "Coinbase will offer several 2FA options. Select Authenticator App for the most secure option. Coinbase may ask you to verify your phone number first.",
      },
      {
        id: 4,
        title: 'Scan the QR Code',
        summary: 'Scan the Coinbase QR code with this Authenticator App.',
        detail:
          "Coinbase will show a QR code. Open this Authenticator App, tap the + button, choose Scan QR Code, and scan the Coinbase QR code. Your account will be added.",
        image: 'qr_scan',
      },
      {
        id: 5,
        title: 'Verify and Enable',
        summary: 'Enter the 6-digit code from this app and click Enable.',
        detail:
          "Enter the 6-digit code shown for Coinbase in this app. Enter it in Coinbase's verification field and click Enable or Verify. Your Coinbase account is now protected with 2FA.",
        image: 'success',
      },
    ],
  },
];
