export type LogTag = "AGENT" | "TERMINAL" | "WHATSAPP";

export type LogLine = {
  id: string;
  tag: LogTag;
  message: string;
  spinner?: boolean;
};

export type DiffLine = {
  type: "add" | "remove" | "context";
  text: string;
};

export type Repo = {
  id: string;
  name: string;
  branch: string;
  language: string;
  updated: string;
  diffFile: string;
  diff: DiffLine[];
  script: LogLine[];
};

export const repos: Repo[] = [
  {
    id: "nextjs-supabase-ecommerce",
    name: "nextjs-supabase-ecommerce",
    branch: "main",
    language: "TypeScript",
    updated: "2m ago",
    diffFile: "app/admin/dashboard/page.tsx",
    diff: [
      { type: "context", text: "import { createClient } from '@/lib/supabase'" },
      { type: "remove", text: "export default function Admin() {" },
      { type: "remove", text: "  return <div>Coming soon</div>" },
      { type: "add", text: "export default async function Admin() {" },
      { type: "add", text: "  const supabase = createClient()" },
      { type: "add", text: "  const { data: orders } = await supabase" },
      { type: "add", text: "    .from('orders').select('id, total, status')" },
      { type: "add", text: "  return <OrdersTable rows={orders ?? []} />" },
      { type: "context", text: "}" },
    ],
    script: [
      { id: "1", tag: "AGENT", message: "Cloning target repository...", spinner: true },
      { id: "2", tag: "AGENT", message: "Indexed 412 files · resolving intent scope." },
      { id: "3", tag: "TERMINAL", message: "Sub-task compilation executing successfully." },
      { id: "4", tag: "TERMINAL", message: "pnpm build · 0 errors, 0 warnings." },
      { id: "5", tag: "WHATSAPP", message: "Notification payload prepared." },
      { id: "6", tag: "AGENT", message: "Patch ready for review — awaiting approval." },
    ],
  },
  {
    id: "django-backend-api",
    name: "django-backend-api",
    branch: "develop",
    language: "Python",
    updated: "18m ago",
    diffFile: "api/views/billing.py",
    diff: [
      { type: "context", text: "class InvoiceViewSet(viewsets.ModelViewSet):" },
      { type: "remove", text: "    permission_classes = [AllowAny]" },
      { type: "add", text: "    permission_classes = [IsAuthenticated]" },
      { type: "add", text: "    def get_queryset(self):" },
      { type: "add", text: "        return Invoice.objects.filter(owner=self.request.user)" },
      { type: "context", text: "    serializer_class = InvoiceSerializer" },
    ],
    script: [
      { id: "1", tag: "AGENT", message: "Cloning target repository...", spinner: true },
      { id: "2", tag: "AGENT", message: "Virtualenv restored from lockfile." },
      { id: "3", tag: "TERMINAL", message: "Sub-task compilation executing successfully." },
      { id: "4", tag: "TERMINAL", message: "pytest · 84 passed in 6.2s." },
      { id: "5", tag: "WHATSAPP", message: "Notification payload prepared." },
      { id: "6", tag: "AGENT", message: "Patch ready for review — awaiting approval." },
    ],
  },
  {
    id: "flutter-driver-app",
    name: "flutter-driver-app",
    branch: "main",
    language: "Dart",
    updated: "1h ago",
    diffFile: "lib/screens/trip_summary.dart",
    diff: [
      { type: "context", text: "Widget build(BuildContext context) {" },
      { type: "remove", text: "  return Text(trip.distance.toString());" },
      { type: "add", text: "  return Column(children: [" },
      { type: "add", text: "    TripMetric(label: 'Distance', value: trip.distanceKm)," },
      { type: "add", text: "    TripMetric(label: 'Earnings', value: trip.payout)," },
      { type: "add", text: "  ]);" },
      { type: "context", text: "}" },
    ],
    script: [
      { id: "1", tag: "AGENT", message: "Cloning target repository...", spinner: true },
      { id: "2", tag: "AGENT", message: "Analyzing widget tree for layout intent." },
      { id: "3", tag: "TERMINAL", message: "Sub-task compilation executing successfully." },
      { id: "4", tag: "WHATSAPP", message: "Notification payload prepared." },
      { id: "5", tag: "AGENT", message: "Patch ready for review — awaiting approval." },
    ],
  },
  {
    id: "edge-telemetry-daemon",
    name: "edge-telemetry-daemon",
    branch: "release/1.4",
    language: "Rust",
    updated: "yesterday",
    diffFile: "src/handshake.rs",
    diff: [
      { type: "context", text: "pub async fn handshake(sock: &Socket) -> Result<Session> {" },
      { type: "remove", text: "    let timeout = Duration::from_secs(2);" },
      { type: "add", text: "    let timeout = Duration::from_secs(10);" },
      { type: "add", text: "    tracing::info!(\"gateway handshake initiated\");" },
      { type: "context", text: "    sock.connect_timeout(timeout).await" },
    ],
    script: [
      { id: "1", tag: "AGENT", message: "Cloning target repository...", spinner: true },
      { id: "2", tag: "TERMINAL", message: "cargo check · finished in 4.1s." },
      { id: "3", tag: "TERMINAL", message: "Sub-task compilation executing successfully." },
      { id: "4", tag: "WHATSAPP", message: "Notification payload prepared." },
      { id: "5", tag: "AGENT", message: "Patch ready for review — awaiting approval." },
    ],
  },
];
