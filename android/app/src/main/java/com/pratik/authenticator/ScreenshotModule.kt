package com.pratik.authenticator

import android.view.WindowManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ScreenshotModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "ScreenshotModule"

  @ReactMethod
  fun enable() {
    val activity = reactContext.currentActivity ?: return
    activity.runOnUiThread {
      activity.window?.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
    }
  }

  @ReactMethod
  fun disable() {
    val activity = reactContext.currentActivity ?: return
    activity.runOnUiThread {
      activity.window?.addFlags(WindowManager.LayoutParams.FLAG_SECURE)
    }
  }
}
