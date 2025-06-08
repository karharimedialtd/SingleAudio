import { RequestAccessForm } from "@/components/auth/request-access-form"

export default function RequestAccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden flex">
        {/* Left side - Request Access form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <RequestAccessForm />
        </div>

        {/* Right side - Platform preview */}
        <div className="hidden md:block w-1/2 bg-gradient-to-br from-purple-50 to-blue-50 p-8 relative">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="space-y-6">
              {/* Platform stats */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">Platform Overview</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold text-gray-900">Music Distribution</h3>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">& YouTube CMS Platform</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-purple-600">CMS</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">DSP</span>
                  </div>
                </div>
              </div>

              {/* Features grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900">YouTube CMS</h4>
                  <p className="text-xs text-gray-600">Content ID & Rights</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mb-2">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900">Music Distribution</h4>
                  <p className="text-xs text-gray-600">15+ DSP Platforms</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mb-2">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M12 2l3.09 6.26L22 9l-5 4.87L18.18 20 12 16.77 5.82 20 7 13.87 2 9l6.91-.74L12 2z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900">AI Tools</h4>
                  <p className="text-xs text-gray-600">Smart Metadata</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mb-2">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900">Royalty Tracking</h4>
                  <p className="text-xs text-gray-600">Real-time Payouts</p>
                </div>
              </div>

              {/* Success metrics */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Artists</span>
                  <span className="text-sm font-semibold text-gray-900">2,847</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: "78%" }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Monthly Releases</span>
                  <span className="text-sm font-semibold text-gray-900">1,234</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* 3D geometric element */}
          <div className="absolute bottom-0 right-0 w-3/4 h-1/2">
            <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-50 rounded-tl-3xl transform rotate-6 translate-y-8 translate-x-4"></div>
            <div className="absolute bottom-8 right-8 w-3/4 h-3/4 bg-gradient-to-br from-purple-200 to-purple-100 rounded-tl-3xl transform -rotate-6"></div>
            <div className="absolute bottom-16 right-16 w-1/2 h-1/2 bg-gradient-to-br from-blue-300 to-purple-200 rounded-tl-3xl transform rotate-12"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
