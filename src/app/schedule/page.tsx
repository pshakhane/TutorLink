import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sessions } from "@/lib/data";
import { CalendarDays, CheckCircle, Clock } from "lucide-react";

function SessionCard({ session }: { session: (typeof sessions)[0] }) {
  const sessionDate = new Date(session.date);
  const isUpcoming = session.status === "upcoming";

  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <Avatar className="h-12 w-12">
          <AvatarImage src={session.tutor.avatar} alt={session.tutor.name} />
          <AvatarFallback>{session.tutor.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <CardTitle>{session.subject}</CardTitle>
          <CardDescription>With {session.tutor.name}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>{sessionDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{sessionDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
        </div>
      </CardContent>
      <CardFooter>
        {isUpcoming ? (
          <Button className="w-full">Join Session</Button>
        ) : (
          <div className="flex items-center w-full text-sm text-green-600">
            <CheckCircle className="h-4 w-4 mr-2" />
            <span>Session Completed</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}


export default function SchedulePage() {
  const upcomingSessions = sessions.filter(s => s.status === 'upcoming').sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const pastSessions = sessions.filter(s => s.status === 'completed').sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="w-full">
      <Tabs defaultValue="upcoming" className="w-full">
        <div className="flex items-center">
            <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            <div className="ml-auto">
                <Button>Schedule New Session</Button>
            </div>
        </div>
        <TabsContent value="upcoming">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
            {upcomingSessions.length > 0 ? (
                upcomingSessions.map((session) => (
                    <SessionCard key={session.id} session={session} />
                ))
            ) : (
                <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No upcoming sessions.</p>
                </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="past">
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
            {pastSessions.length > 0 ? (
                pastSessions.map((session) => (
                    <SessionCard key={session.id} session={session} />
                ))
            ) : (
                <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No past sessions.</p>
                </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
