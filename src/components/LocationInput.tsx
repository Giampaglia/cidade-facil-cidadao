import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface LocationInputProps {
  address: string;
  onAddressChange: (address: string) => void;
  coordinates?: { lat: number; lng: number } | null;
  onCoordinatesChange: (coords: { lat: number; lng: number } | null) => void;
}

export function LocationInput({ 
  address, 
  onAddressChange, 
  coordinates, 
  onCoordinatesChange 
}: LocationInputProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada neste navegador");
      return;
    }

    setIsGettingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        onCoordinatesChange(coords);
        onAddressChange("📍 Localização atual obtida");
        setIsGettingLocation(false);
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
        alert("Não foi possível obter sua localização. Digite o endereço manualmente.");
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">
        Localização do Problema *
      </label>
      
      <div className="flex gap-2">
        <Input
          placeholder="Digite o endereço ou use sua localização"
          value={address}
          onChange={(e) => {
            onAddressChange(e.target.value);
            if (!e.target.value.includes("📍")) {
              onCoordinatesChange(null);
            }
          }}
          className="flex-1"
        />
        <Button
          variant="outline"
          onClick={getCurrentLocation}
          disabled={isGettingLocation}
          className="px-3"
        >
          {isGettingLocation ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
        </Button>
      </div>

      {coordinates && (
        <Card className="p-3 bg-success/10 border-success/20">
          <div className="flex items-center space-x-2 text-sm text-success-foreground">
            <MapPin className="h-4 w-4" />
            <span>
              Localização obtida: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
            </span>
          </div>
        </Card>
      )}
    </div>
  );
}