import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LocationInput } from "./LocationInput";
import { ServiceSelector } from "./ServiceSelector";
import { PhotoUpload } from "./PhotoUpload";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormData {
  address: string;
  coordinates: { lat: number; lng: number } | null;
  serviceType: string;
  description: string;
  photos: File[];
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ServiceRequestForm() {
  const [formData, setFormData] = useState<FormData>({
    address: '',
    coordinates: null,
    serviceType: '',
    description: '',
    photos: []
  });
  
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = (): string[] => {
    const validationErrors: string[] = [];
    
    if (!formData.address.trim()) {
      validationErrors.push('Endereço é obrigatório');
    }
    
    if (!formData.serviceType) {
      validationErrors.push('Tipo de serviço é obrigatório');
    }
    
    if (formData.description.trim().length < 20) {
      validationErrors.push('Descrição deve ter pelo menos 20 caracteres');
    }
    
    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    setErrors(validationErrors);
    
    if (validationErrors.length > 0) {
      return;
    }
    
    setStatus('submitting');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          address: '',
          coordinates: null,
          serviceType: '',
          description: '',
          photos: []
        });
        setStatus('idle');
      }, 3000);
      
    } catch (error) {
      setStatus('error');
      setErrors(['Erro ao enviar solicitação. Tente novamente.']);
    }
  };

  const resetForm = () => {
    setFormData({
      address: '',
      coordinates: null,
      serviceType: '',
      description: '',
      photos: []
    });
    setStatus('idle');
    setErrors([]);
  };

  if (status === 'success') {
    return (
      <Card className="p-6 text-center">
        <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Solicitação Enviada com Sucesso!
        </h2>
        <p className="text-muted-foreground mb-4">
          Sua solicitação foi registrada e será analisada pela equipe responsável.
        </p>
        <div className="space-y-3">
          <Button variant="default" className="w-full">
            Acompanhar Status
          </Button>
          <Button variant="outline" onClick={resetForm} className="w-full">
            Nova Solicitação
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <LocationInput
            address={formData.address}
            onAddressChange={(address) => setFormData(prev => ({ ...prev, address }))}
            coordinates={formData.coordinates}
            onCoordinatesChange={(coordinates) => setFormData(prev => ({ ...prev, coordinates }))}
          />

          <ServiceSelector
            selectedService={formData.serviceType}
            onServiceSelect={(serviceType) => setFormData(prev => ({ ...prev, serviceType }))}
          />

          <PhotoUpload
            photos={formData.photos}
            onPhotosChange={(photos) => setFormData(prev => ({ ...prev, photos }))}
          />

          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Descrição do Problema *
            </label>
            <Textarea
              placeholder="Descreva o problema com detalhes (mínimo 20 caracteres)"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className={formData.description.length > 0 && formData.description.length < 20 ? "border-destructive" : ""}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Mínimo 20 caracteres</span>
              <span className={formData.description.length < 20 ? "text-destructive" : "text-success"}>
                {formData.description.length}/20
              </span>
            </div>
          </div>
        </div>
      </Card>

      {errors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Button 
        type="submit" 
        className="w-full" 
        size="lg"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Enviando Solicitação...
          </>
        ) : (
          'Enviar Solicitação'
        )}
      </Button>
    </form>
  );
}