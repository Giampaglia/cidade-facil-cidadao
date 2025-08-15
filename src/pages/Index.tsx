import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import { MapPin, Users, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-primary p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Cidade Fácil</h1>
              <p className="text-sm text-muted-foreground">Serviços públicos simplificados</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Registrar Solicitação
          </h2>
          <p className="text-muted-foreground text-sm">
            Reporte problemas urbanos de forma rápida e acompanhe o andamento.
          </p>
        </div>

        <ServiceRequestForm />

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-card p-4 rounded-lg border">
            <Users className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="text-lg font-semibold text-foreground">1.2K</p>
            <p className="text-xs text-muted-foreground">Solicitações</p>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <Clock className="h-5 w-5 text-success mx-auto mb-2" />
            <p className="text-lg font-semibold text-foreground">72h</p>
            <p className="text-xs text-muted-foreground">Tempo médio</p>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <MapPin className="h-5 w-5 text-warning mx-auto mb-2" />
            <p className="text-lg font-semibold text-foreground">95%</p>
            <p className="text-xs text-muted-foreground">Resolvidas</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
