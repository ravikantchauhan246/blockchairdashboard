import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2 text-foreground">404</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Blockchain not found or not supported
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            The blockchain you're looking for doesn't exist or isn't supported by our platform.
          </p>
          <Button onClick={() => navigate('/')} className="w-full">
            <Home className="w-4 h-4 mr-2" />
            Return to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
