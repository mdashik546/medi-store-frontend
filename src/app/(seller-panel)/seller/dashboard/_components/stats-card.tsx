import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { title: "Total Orders", value: "12", description: "Active orders" },
  { title: "Revenue", value: "৳ 2,350", description: "This month" },
  { title: "Top Product", value: "Product A", description: "Best seller" },
];
const StatsCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="bg-card border-border hover:shadow-sm transition-shadow"
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              {stat.value}
            </div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCard;
