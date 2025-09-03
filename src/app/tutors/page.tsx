import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tutors, Tutor } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ListFilter, Search, Star, Verified } from "lucide-react";

function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={tutor.avatar} alt={tutor.name} data-ai-hint="person portrait" />
          <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <CardTitle className="flex items-center gap-2">
          {tutor.name}
          {tutor.verified && <Verified className="h-5 w-5 text-primary" />}
        </CardTitle>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span>{tutor.rating}</span>
          <span className="text-xs">({tutor.reviews} reviews)</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {tutor.subjects.map((subject) => (
            <Badge key={subject} variant="secondary">
              {subject}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center line-clamp-3">
          {tutor.bio}
        </p>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-2">
         <div className="text-center">
            <span className="text-2xl font-bold">${tutor.hourlyRate}</span>
            <span className="text-sm text-muted-foreground">/hour</span>
         </div>
        <Button className="w-full">View Profile</Button>
      </CardFooter>
    </Card>
  );
}

export default function TutorsPage() {
  return (
    <div className="flex flex-col w-full">
      <header className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Find Your Tutor</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by subject or tutor name..."
              className="pl-9"
            />
          </div>
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Verified Tutors
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Available Now
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      </main>
    </div>
  );
}
