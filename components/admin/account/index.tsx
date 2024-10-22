import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export default function Profile() {
    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Settings</h3>
            <div className="mt-5 space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button>Change Avatar</Button>
              </div>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" defaultValue="John" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" defaultValue="Doe" className="mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="john.doe@example.com" className="mt-1" />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-gray-900">Email notifications</span>
                  <span className="text-sm text-gray-500">Receive emails about your account activity</span>
                </div>
                <Switch />
              </div>
              <div className="pt-5">
                <div className="flex justify-end space-x-3">
                  {/* <Button variant="outline" onClick={() => setShowProfileSettings(false)}>Cancel</Button> */}
                  <Button>Save Changes</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}