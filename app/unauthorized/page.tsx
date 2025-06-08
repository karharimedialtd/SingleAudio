import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <Card className="w-full bg-white shadow-lg">
          <CardHeader className="text-center">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-2xl text-gray-900">Access Denied</CardTitle>
            <CardDescription className="text-gray-600">
              You don't have permission to access this resource
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Your account may not have the required permissions, or your session may have expired.
            </p>
            <div className="space-y-2">
              <Link href="/login" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Back to Login</Button>
              </Link>
              <Link href="/request-access" className="block">
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  Request Access
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
