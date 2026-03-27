import { IconSearch, IconUserCheck, IconUserX } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const users = [
  { name: "Liya Bekele", email: "liya.g11@student.com", role: "student", status: "active" },
  { name: "Samuel Hailu", email: "samuel@teacher.com", role: "teacher", status: "active" },
  { name: "Nardos Taye", email: "nardos.g10@student.com", role: "student", status: "inactive" },
  { name: "Admin Root", email: "admin@edutwin.com", role: "admin", status: "active" },
]

export default function AdminUsersPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>User management</CardTitle>
            <CardDescription>Search and manage platform users by role and status.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <Input className="pl-9" placeholder="Search name or email" />
              </div>
              <Button className="sm:w-auto">Add user</Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.email}>
                    <TableCell className="font-medium text-slate-900">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-50 text-blue-600 capitalize">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={user.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-600"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.status === "active" ? (
                        <Button variant="outline" size="sm">
                          <IconUserX className="size-4" />
                          Disable
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          <IconUserCheck className="size-4" />
                          Enable
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
