import {
  Footer,
  Grid,
  NavBar,
  PaginationBar,
  UserDetails,
} from "~/components/custom";

export default async function Profile() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <NavBar isProfile={true} />
      <UserDetails />
      <Grid />
      <PaginationBar />
      <Footer />
    </main>
  );
}
