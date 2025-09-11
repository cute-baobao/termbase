import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="flex h-full w-full">
        {/* sidebar here*/}
        <div className="fixed top-0 left-0 hidden h-full overflow-hidden lg:block lg:w-[264px]">
          <Sidebar />
        </div>
        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto h-full max-w-screen-2xl">
            <Navbar />
            <main className="flex h-full flex-col px-6 py-8">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
