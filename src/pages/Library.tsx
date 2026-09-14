import CampusLifePage from "@/components/CampusLifePage";

export default function LibraryPage() {
  return (
    <CampusLifePage
      sectionKey="library"
      layout="centered"
      breadcrumbs={[{"label":"Campus","href":"/infrastructure"},{"label":"Library"}]}
      specsGrid="sm:grid-cols-2 lg:grid-cols-4"
      defaults={{
        title: "Library",
        subtitle: "A specialised resource centre for scholarship and research",
      }}
    />
  );
}
