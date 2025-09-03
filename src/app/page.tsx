import {
  Activity,
  ArrowUpRight,
  CalendarCheck,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const upcomingSessions = [
  {
    tutor: "Dr. Emily Carter",
    subject: "Quantum Physics",
    date: "2024-07-22",
    time: "14:00",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    tutor: "Johnathan Smith",
    subject: "Creative Writing",
    date: "2024-07-24",
    time: "10:30",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d",
  },
];

const recommendedTutors = [
  {
    name: "Maria Garcia",
    subject: "Spanish Literature",
    rating: 4.9,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d",
  },
  {
    name: "David Chen",
    subject: "Data Structures",
    rating: 4.8,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026707d",
  },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Session
              </CardTitle>
              <CalendarCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Quantum Physics</div>
              <p className="text-xs text-muted-foreground">
                with Dr. Emily Carter
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Tomorrow at 14:00
              </p>
              <Button size="sm" className="mt-4">Join Session</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Unread Messages
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                from 2 tutors
              </p>
               <Button size="sm" variant="outline" className="mt-4" asChild>
                <Link href="/messages">View Messages</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Your Progress
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Good</div>
              <p className="text-xs text-muted-foreground">
                in Algebra II. Keep it up!
              </p>
              <Button size="sm" variant="outline" className="mt-4" asChild>
                <Link href="/progress">View Reports</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>
                  Here are your scheduled tutoring sessions.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/schedule">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tutor</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-right">Date & Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingSessions.map((session, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={session.avatar}
                              alt={session.tutor}
                            />
                            <AvatarFallback>
                              {session.tutor.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{session.tutor}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-accent/50 text-accent-foreground/80">{session.subject}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {new Date(session.date).toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })} at {session.time}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center">
               <div className="grid gap-2">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Recommended Tutors
                </CardTitle>
                <CardDescription>
                  AI-powered suggestions based on your goals.
                </CardDescription>
              </div>
               <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/recommendations">
                  More
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="grid gap-6">
               {recommendedTutors.map((tutor) => (
                <div key={tutor.name} className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={tutor.avatar} alt={tutor.name} />
                        <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {tutor.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {tutor.subject}
                        </p>
                      </div>
                    </div>
                     <Button variant="outline" size="sm">View</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
