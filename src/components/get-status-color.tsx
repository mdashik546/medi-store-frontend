 export const getStatusColor = (status: string) => {
    switch (status) {
      case "PLACED":
      case "PENDING":
        return "bg-muted/50 text-muted-foreground";
      case "CANCELLED":
        return "bg-destructive/10 text-destructive";
      case "PROCESSING":
        return "bg-primary/10 text-primary";
      case "SHIPPED":
        return "bg-blue-100/50 text-blue-900";
      case "DELIVERED":
        return "bg-green-100/50 text-green-900";
      default:
        return "bg-muted/50 text-muted-foreground";
    }
  };