"use client"

import { useState, useEffect } from "react"
import { useDashboard } from "@/context/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Monitor, Sun, Moon, Contrast, Type, Layout, Save, RotateCcw } from "lucide-react"

export default function AppearancePage() {
  const { setCurrentPage, addNotification } = useDashboard()
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark"
    }
    return "dark"
  })
  const [accentColor, setAccentColor] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accentColor") || "purple"
    }
    return "purple"
  })
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fontSize")
      return saved ? [Number.parseInt(saved)] : [16]
    }
    return [16]
  })
  const [sidebarStyle, setSidebarStyle] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebarStyle") || "default"
    }
    return "default"
  })
  const [animations, setAnimations] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("animations") !== "false"
    }
    return true
  })
  const [compactMode, setCompactMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("compactMode") === "true"
    }
    return false
  })
  const [highContrast, setHighContrast] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("highContrast") === "true"
    }
    return false
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setCurrentPage("Appearance")
    applySettings()
  }, [setCurrentPage])

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ]

  const accentColors = [
    { value: "purple", label: "Purple", color: "bg-purple-500" },
    { value: "blue", label: "Blue", color: "bg-blue-500" },
    { value: "green", label: "Green", color: "bg-green-500" },
    { value: "red", label: "Red", color: "bg-red-500" },
    { value: "orange", label: "Orange", color: "bg-orange-500" },
    { value: "pink", label: "Pink", color: "bg-pink-500" },
  ]

  const applySettings = () => {
    if (typeof window === "undefined") return

    const root = document.documentElement
    const body = document.body

    // Apply theme
    if (theme === "light") {
      root.classList.remove("dark")
      root.classList.add("light")
      body.style.background = "hsl(0 0% 100%)"
      body.style.color = "hsl(222.2 84% 4.9%)"
    } else if (theme === "dark") {
      root.classList.remove("light")
      root.classList.add("dark")
      body.style.background = "linear-gradient(135deg, #1a1b3a 0%, #2d1b69 100%)"
      body.style.color = "hsl(213 31% 91%)"
    } else {
      // System theme
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      root.classList.toggle("dark", prefersDark)
      root.classList.toggle("light", !prefersDark)
      if (prefersDark) {
        body.style.background = "linear-gradient(135deg, #1a1b3a 0%, #2d1b69 100%)"
        body.style.color = "hsl(213 31% 91%)"
      } else {
        body.style.background = "hsl(0 0% 100%)"
        body.style.color = "hsl(222.2 84% 4.9%)"
      }
    }

    // Apply font size
    root.style.fontSize = `${fontSize[0]}px`

    // Apply accent color CSS variables
    const accentColorMap = {
      purple: { primary: "262 83% 58%", secondary: "262 83% 58%" },
      blue: { primary: "221 83% 53%", secondary: "221 83% 53%" },
      green: { primary: "142 71% 45%", secondary: "142 71% 45%" },
      red: { primary: "0 84% 60%", secondary: "0 84% 60%" },
      orange: { primary: "25 95% 53%", secondary: "25 95% 53%" },
      pink: { primary: "330 81% 60%", secondary: "330 81% 60%" },
    }

    const colors = accentColorMap[accentColor as keyof typeof accentColorMap]
    if (colors) {
      root.style.setProperty("--primary", colors.primary)
      root.style.setProperty("--secondary", colors.secondary)
    }

    // Apply compact mode
    root.classList.toggle("compact", compactMode)
    if (compactMode) {
      root.style.setProperty("--spacing-unit", "0.75rem")
    } else {
      root.style.setProperty("--spacing-unit", "1rem")
    }

    // Apply high contrast
    root.classList.toggle("high-contrast", highContrast)
    if (highContrast) {
      root.style.setProperty("--contrast-multiplier", "1.5")
    } else {
      root.style.setProperty("--contrast-multiplier", "1")
    }

    // Apply animations
    root.classList.toggle("no-animations", !animations)
    if (!animations) {
      root.style.setProperty("--animation-duration", "0s")
    } else {
      root.style.setProperty("--animation-duration", "0.2s")
    }

    console.log("Applied appearance settings:", {
      theme,
      accentColor,
      fontSize: fontSize[0],
      sidebarStyle,
      animations,
      compactMode,
      highContrast,
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    console.log("Saving appearance settings...")

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme)
      localStorage.setItem("accentColor", accentColor)
      localStorage.setItem("fontSize", fontSize[0].toString())
      localStorage.setItem("sidebarStyle", sidebarStyle)
      localStorage.setItem("animations", animations.toString())
      localStorage.setItem("compactMode", compactMode.toString())
      localStorage.setItem("highContrast", highContrast.toString())
    }

    // Apply settings
    applySettings()

    setTimeout(() => {
      setIsSaving(false)
      addNotification({
        type: "success",
        title: "Settings Saved",
        message: "Appearance settings have been saved and applied successfully",
      })
    }, 1000)
  }

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all appearance settings to default?")) {
      setTheme("dark")
      setAccentColor("purple")
      setFontSize([16])
      setSidebarStyle("default")
      setAnimations(true)
      setCompactMode(false)
      setHighContrast(false)

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("theme")
        localStorage.removeItem("accentColor")
        localStorage.removeItem("fontSize")
        localStorage.removeItem("sidebarStyle")
        localStorage.removeItem("animations")
        localStorage.removeItem("compactMode")
        localStorage.removeItem("highContrast")
      }

      // Apply default settings
      setTimeout(() => {
        applySettings()
        addNotification({
          type: "success",
          title: "Settings Reset",
          message: "Appearance settings have been reset to default values",
        })
      }, 100)
    }
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    console.log(`Theme changed to: ${newTheme}`)

    // Apply immediately for preview
    setTimeout(() => {
      const root = document.documentElement
      const body = document.body

      if (newTheme === "light") {
        root.classList.remove("dark")
        root.classList.add("light")
        body.style.background = "hsl(0 0% 100%)"
        body.style.color = "hsl(222.2 84% 4.9%)"
      } else if (newTheme === "dark") {
        root.classList.remove("light")
        root.classList.add("dark")
        body.style.background = "linear-gradient(135deg, #1a1b3a 0%, #2d1b69 100%)"
        body.style.color = "hsl(213 31% 91%)"
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        root.classList.toggle("dark", prefersDark)
        root.classList.toggle("light", !prefersDark)
        if (prefersDark) {
          body.style.background = "linear-gradient(135deg, #1a1b3a 0%, #2d1b69 100%)"
          body.style.color = "hsl(213 31% 91%)"
        } else {
          body.style.background = "hsl(0 0% 100%)"
          body.style.color = "hsl(222.2 84% 4.9%)"
        }
      }
    }, 50)
  }

  const handleAccentColorChange = (newColor: string) => {
    setAccentColor(newColor)
    console.log(`Accent color changed to: ${newColor}`)

    // Apply immediately for preview
    setTimeout(() => {
      const accentColorMap = {
        purple: { primary: "262 83% 58%", secondary: "262 83% 58%" },
        blue: { primary: "221 83% 53%", secondary: "221 83% 53%" },
        green: { primary: "142 71% 45%", secondary: "142 71% 45%" },
        red: { primary: "0 84% 60%", secondary: "0 84% 60%" },
        orange: { primary: "25 95% 53%", secondary: "25 95% 53%" },
        pink: { primary: "330 81% 60%", secondary: "330 81% 60%" },
      }

      const colors = accentColorMap[newColor as keyof typeof accentColorMap]
      if (colors) {
        document.documentElement.style.setProperty("--primary", colors.primary)
        document.documentElement.style.setProperty("--secondary", colors.secondary)
      }
    }, 50)
  }

  const handleFontSizeChange = (newSize: number[]) => {
    setFontSize(newSize)
    console.log(`Font size changed to: ${newSize[0]}px`)

    // Apply immediately for preview
    setTimeout(() => {
      document.documentElement.style.fontSize = `${newSize[0]}px`
    }, 50)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Appearance</h1>
          <p className="text-gray-400">Customize the look and feel of your dashboard</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleReset}
            className="border-white/20 text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700" disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="theme" className="space-y-6">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger
            value="theme"
            className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-white/20"
          >
            <Palette className="h-4 w-4 mr-2" />
            Theme
          </TabsTrigger>
          <TabsTrigger
            value="layout"
            className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-white/20"
          >
            <Layout className="h-4 w-4 mr-2" />
            Layout
          </TabsTrigger>
          <TabsTrigger
            value="typography"
            className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-white/20"
          >
            <Type className="h-4 w-4 mr-2" />
            Typography
          </TabsTrigger>
          <TabsTrigger
            value="accessibility"
            className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-white/20"
          >
            <Contrast className="h-4 w-4 mr-2" />
            Accessibility
          </TabsTrigger>
        </TabsList>

        <TabsContent value="theme" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Color Theme</CardTitle>
              <CardDescription className="text-gray-400">Choose your preferred color scheme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {themeOptions.map((option) => (
                  <Card
                    key={option.value}
                    className={`cursor-pointer transition-all hover:bg-white/10 ${
                      theme === option.value
                        ? "bg-purple-600/20 border-purple-500/50 ring-1 ring-purple-500/30"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                    onClick={() => handleThemeChange(option.value)}
                  >
                    <CardContent className="p-6 text-center">
                      <option.icon className="h-8 w-8 mx-auto mb-3 text-gray-300" />
                      <p className="text-white font-medium">{option.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Accent Color</CardTitle>
              <CardDescription className="text-gray-400">Select your preferred accent color</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {accentColors.map((color) => (
                  <Card
                    key={color.value}
                    className={`cursor-pointer transition-all hover:bg-white/10 ${
                      accentColor === color.value ? "ring-2 ring-white/50" : "hover:ring-1 hover:ring-white/30"
                    }`}
                    onClick={() => handleAccentColorChange(color.value)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`w-8 h-8 rounded-full ${color.color} mx-auto mb-2`}></div>
                      <p className="text-white text-sm">{color.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Layout Options</CardTitle>
              <CardDescription className="text-gray-400">Customize your dashboard layout</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Sidebar Style</Label>
                <Select value={sidebarStyle} onValueChange={setSidebarStyle}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="floating">Floating</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white font-medium">Compact Mode</p>
                  <p className="text-gray-400 text-sm">Reduce spacing and padding throughout the interface</p>
                </div>
                <Switch
                  checked={compactMode}
                  onCheckedChange={(checked) => {
                    setCompactMode(checked)
                    console.log(`Compact mode: ${checked}`)
                    document.documentElement.classList.toggle("compact", checked)
                    if (checked) {
                      document.documentElement.style.setProperty("--spacing-unit", "0.75rem")
                    } else {
                      document.documentElement.style.setProperty("--spacing-unit", "1rem")
                    }
                  }}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white font-medium">Smooth Animations</p>
                  <p className="text-gray-400 text-sm">Enable smooth transitions and animations</p>
                </div>
                <Switch
                  checked={animations}
                  onCheckedChange={(checked) => {
                    setAnimations(checked)
                    console.log(`Animations: ${checked}`)
                    document.documentElement.classList.toggle("no-animations", !checked)
                    if (!checked) {
                      document.documentElement.style.setProperty("--animation-duration", "0s")
                    } else {
                      document.documentElement.style.setProperty("--animation-duration", "0.2s")
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Font Settings</CardTitle>
              <CardDescription className="text-gray-400">Adjust text size and readability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Font Size</Label>
                  <span className="text-white font-medium">{fontSize[0]}px</span>
                </div>
                <Slider
                  value={fontSize}
                  onValueChange={handleFontSizeChange}
                  max={24}
                  min={12}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Small (12px)</span>
                  <span>Medium (16px)</span>
                  <span>Large (24px)</span>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="text-white font-semibold mb-2" style={{ fontSize: `${fontSize[0]}px` }}>
                  Preview Text
                </h3>
                <p className="text-gray-300" style={{ fontSize: `${fontSize[0] * 0.875}px` }}>
                  This is how your text will appear with the current font size settings. You can adjust the slider above
                  to find the perfect size for your needs.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Accessibility Options</CardTitle>
              <CardDescription className="text-gray-400">
                Improve accessibility and readability of the interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white font-medium">High Contrast Mode</p>
                  <p className="text-gray-400 text-sm">Increase contrast for better visibility</p>
                </div>
                <Switch
                  checked={highContrast}
                  onCheckedChange={(checked) => {
                    setHighContrast(checked)
                    console.log(`High contrast: ${checked}`)
                    document.documentElement.classList.toggle("high-contrast", checked)
                    if (checked) {
                      document.documentElement.style.setProperty("--contrast-multiplier", "1.5")
                    } else {
                      document.documentElement.style.setProperty("--contrast-multiplier", "1")
                    }
                  }}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white font-medium">Reduce Motion</p>
                  <p className="text-gray-400 text-sm">Minimize animations and transitions</p>
                </div>
                <Switch
                  checked={!animations}
                  onCheckedChange={(checked) => {
                    setAnimations(!checked)
                    console.log(`Reduce motion: ${checked}`)
                    document.documentElement.classList.toggle("no-animations", checked)
                    if (checked) {
                      document.documentElement.style.setProperty("--animation-duration", "0s")
                    } else {
                      document.documentElement.style.setProperty("--animation-duration", "0.2s")
                    }
                  }}
                />
              </div>

              <div className="p-4 bg-blue-600/20 border border-blue-600/30 rounded-lg">
                <h4 className="text-blue-400 font-medium mb-2">Accessibility Features:</h4>
                <ul className="text-blue-300 text-sm space-y-1">
                  <li>• Keyboard navigation support</li>
                  <li>• Screen reader compatibility</li>
                  <li>• Focus indicators</li>
                  <li>• Alt text for images</li>
                  <li>• ARIA labels and descriptions</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
