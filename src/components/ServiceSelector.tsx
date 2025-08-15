import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  TreePine, 
  Trash2, 
  Construction, 
  Recycle,
  MoreHorizontal 
} from "lucide-react";

interface ServiceSelectorProps {
  selectedService: string;
  onServiceSelect: (service: string) => void;
}

const services = [
  { id: "iluminacao", label: "Iluminação Pública", icon: Lightbulb },
  { id: "poda", label: "Poda de Árvores", icon: TreePine },
  { id: "entulho", label: "Entulho", icon: Recycle },
  { id: "pavimentacao", label: "Pavimentação", icon: Construction },
  { id: "lixo", label: "Lixo", icon: Trash2 },
  { id: "outros", label: "Outros", icon: MoreHorizontal },
];

export function ServiceSelector({ selectedService, onServiceSelect }: ServiceSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">
        Tipo de Serviço *
      </label>
      <div className="grid grid-cols-2 gap-3">
        {services.map((service) => {
          const Icon = service.icon;
          const isSelected = selectedService === service.id;
          
          return (
            <Card
              key={service.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected 
                  ? "ring-2 ring-primary bg-primary/5 border-primary" 
                  : "hover:border-primary/50"
              }`}
              onClick={() => onServiceSelect(service.id)}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <Icon 
                  className={`h-6 w-6 ${
                    isSelected ? "text-primary" : "text-muted-foreground"
                  }`} 
                />
                <span className={`text-sm font-medium ${
                  isSelected ? "text-primary" : "text-foreground"
                }`}>
                  {service.label}
                </span>
                {isSelected && (
                  <Badge variant="default" className="text-xs">
                    Selecionado
                  </Badge>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}