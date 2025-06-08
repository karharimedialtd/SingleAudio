import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden flex">
        {/* Left side - Login form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <LoginForm />
        </div>

        {/* Right side - Dashboard preview */}
        <div className="hidden md:block w-1/2 bg-blue-50 p-8 relative">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="space-y-6">
              {/* Revenue section */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total revenue</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold text-gray-900">$354,320</h3>
                    <span className="ml-2 text-xs text-green-600">+2.5%</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">All</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">1M</span>
                  </div>
                </div>
              </div>

              {/* Chart and legend */}
              <div className="flex">
                <div className="w-32 h-32">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e5e7eb" strokeWidth="20" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#3b82f6"
                      strokeWidth="20"
                      strokeDasharray="188.5 251.3"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
                <div className="flex-1 pl-4 space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-xs text-gray-600">Paid</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
                    <span className="text-xs text-gray-600">Free</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-300 mr-2"></div>
                    <span className="text-xs text-gray-600">Other</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-800 mr-2"></div>
                    <span className="text-xs text-gray-600">Refund</span>
                  </div>
                </div>
              </div>

              {/* User notifications */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                    <img src="/placeholder.svg?height=32&width=32" alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900">John Doe</p>
                    <p className="text-xs text-gray-500">@johndoe sent you a message</p>
                  </div>
                  <span className="text-xs text-gray-400">2m ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                    <img src="/placeholder.svg?height=32&width=32" alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900">Jane Smith</p>
                    <p className="text-xs text-gray-500">@janesmith commented on your post</p>
                  </div>
                  <span className="text-xs text-gray-400">5m ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3D geometric element */}
          <div className="absolute bottom-0 right-0 w-3/4 h-1/2">
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 rounded-tl-3xl transform rotate-6 translate-y-8 translate-x-4"></div>
            <div className="absolute bottom-8 right-8 w-3/4 h-3/4 bg-gradient-to-br from-blue-200 to-blue-100 rounded-tl-3xl transform -rotate-6"></div>
            <div className="absolute bottom-16 right-16 w-1/2 h-1/2 bg-gradient-to-br from-blue-300 to-blue-200 rounded-tl-3xl transform rotate-12"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
