import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useCart } from '../contexts/cart-context'
import { Plus, Minus } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { CartItem } from '../contexts/cart-context'

interface Product {
  id: string | number;
  name: string;
  description: string;
  category: string;
  pricingOptions: {
    timeBased: Array<{ unit: string; price: number }>;
    areaBased: Array<{ unit: string; price: number }>;
    frequencyBased: Array<{ unit: string; multiplier: number }>;
  };
}

interface CleaningServiceDetailProps {
  product: Product;
}

interface ServiceOption {
  name: string;
  amount: number;
}

interface ServiceDetail {
  selectedOptions: ServiceOption[];
  customPrice: number;
}

type FrequencyType = "weekly" | "bi-weekly" | "monthly" | "one-time";

interface CleaningDetails {
  hours: number;
  area: number;
  frequency: FrequencyType;
}

type ServiceDetailsType = Record<string, ServiceDetail>;

interface CartItemBase {
  id: number;
  name: string;
  category: string;
}

interface CleaningCartItem extends CartItemBase {
  type: "cleaning";
  serviceDetails: CleaningDetails;
  price: number;
}

interface MediaCartItem extends CartItemBase {
  type: "media";
  serviceDetails: ServiceDetailsType;
  price: number;
}


export default function CleaningServiceDetail({ product }: CleaningServiceDetailProps) {
  const [hours, setHours] = useState(1)
  const [area, setArea] = useState(100)
  const [frequency, setFrequency] = useState(product.pricingOptions.frequencyBased[0].unit)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [quantity, setQuantity] = useState(1)
  const [serviceDetails, setServiceDetails] = useState<ServiceDetailsType>({})
  const { addToCart } = useCart()

  const calculatePrice = () => {
    if (product.name.includes("iD Media")) {
      return Object.values(serviceDetails).reduce((total, service) => {
        return total + service.selectedOptions.reduce((serviceTotal: number, option: ServiceOption) => {
          return serviceTotal + (service.customPrice * option.amount)
        }, 0)
      }, 0) * quantity
    } else {
      const hourlyRate = product.pricingOptions.timeBased.find((option: any) => option.unit === 'hour')?.price || 0
      const areaRate = product.pricingOptions.areaBased.find((option: any) => option.unit === 'sq m')?.price || 0
      const frequencyMultiplier = product.pricingOptions.frequencyBased.find((option: any) => option.unit === frequency)?.multiplier || 1

      const basePrice = (hourlyRate * hours) + (areaRate * area)
      return basePrice * frequencyMultiplier * quantity
    }
  }

  const handleAddToCart = () => {
    const price = calculatePrice();
    const isMediaService = product.name.includes("iD Media");

    const cartItem = isMediaService
        ? {
            id: typeof product.id === 'string' ? parseInt(product.id) : product.id,
            name: product.name,
            category: product.category,
            type: "media" as const,
            price: price,
            serviceDetails: serviceDetails as Record<string, ServiceDetail>,
            quantity: quantity,
            costCenter: "",
            deliveryAddress: "",
            project: "",
          }
        : {
            id: typeof product.id === 'string' ? parseInt(product.id) : product.id,
            name: product.name,
            category: product.category,
            type: "cleaning" as const,
            price: price,
            serviceDetails: {
              hours,
              area,
              frequency: frequency as FrequencyType,
            },
            quantity: quantity,
            costCenter: "",
            deliveryAddress: "",
            project: "",
          };
  
      addToCart(cartItem as CartItem, quantity);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1))

  const handleServiceChange = (serviceName: string, checked: boolean) => {
    setSelectedServices(prev => {
      if (checked) {
        return [...prev, serviceName];
      } else {
        return prev.filter(s => s !== serviceName);
      }
    });
    if (checked && !serviceDetails[serviceName]) {
      setServiceDetails(prev => ({
        ...prev,
        [serviceName]: { selectedOptions: [], customPrice: 0 }
      }));
    }
  }

  const handleOptionChange = (serviceName: string, optionName: string, amount: number) => {
    setServiceDetails(prev => ({
      ...prev,
      [serviceName]: {
        ...prev[serviceName],
        selectedOptions: [
          ...prev[serviceName].selectedOptions.filter(o => o.name !== optionName),
          { name: optionName, amount }
        ]
      }
    }));
  }

  const handleCustomPriceChange = (serviceName: string, price: number) => {
    setServiceDetails(prev => ({
      ...prev,
      [serviceName]: {
        ...prev[serviceName],
        customPrice: price
      }
    }));
  }

  const idMediaServices = [
    {
      name: "Advertising",
      pricingOptions: [
        { name: "Cost Per Click (CPC)", unit: "€ per click", example: "€0.50/click" },
        { name: "Cost Per Thousand Impressions (CPM)", unit: "€ per 1,000 impressions", example: "€10/1,000 impressions" },
        { name: "Cost Per Acquisition (CPA)", unit: "€ per acquisition", example: "€20/acquisition" },
        { name: "Flat Rate", unit: "€ per placement", example: "€5,000/week for homepage banner" }
      ]
    },
    {
      name: "Media Production Services",
      pricingOptions: [
        { name: "Per Project", unit: "Fixed € per completed project", example: "€10,000 for a 3-minute promotional video" },
        { name: "Per Hour or Day", unit: "€ per hour or per 8-hour shift", example: "€100/hour for video editing" },
        { name: "Per Deliverable", unit: "€ per output", example: "€2,000 per podcast episode" }
      ]
    },
    {
      name: "Media Buying",
      pricingOptions: [
        { name: "Per Campaign", unit: "Fixed € for a defined campaign period", example: "€50,000 for a 3-month campaign" },
        { name: "Per Media Channel", unit: "Fixed € per medium", example: "€20,000 for TV and €10,000 for online" },
        { name: "Per Reach or Audience Size", unit: "€ per estimated audience reached", example: "€0.02/person for 500,000 people" }
      ]
    },
    {
      name: "Public Relations (PR) Services",
      pricingOptions: [
        { name: "Per Hour", unit: "€ per hour of work", example: "€150/hour for PR consulting" },
        { name: "Per Press Release", unit: "€ per press release", example: "€500/press release" },
        { name: "Monthly Retainer", unit: "Fixed € per month for ongoing services", example: "€3,000/month for PR management" }
      ]
    },
    {
      name: "Social Media Management",
      pricingOptions: [
        { name: "Per Month", unit: "Fixed € for monthly management", example: "€2,000/month for social media management" },
        { name: "Per Post", unit: "€ per post created and published", example: "€100/post" },
        { name: "Per Campaign", unit: "Fixed € for a defined campaign", example: "€5,000 for a 2-week campaign" }
      ]
    },
    {
      name: "Influencer Marketing",
      pricingOptions: [
        { name: "Per Post", unit: "€ per post or video", example: "€500/Instagram post" },
        { name: "Per Campaign", unit: "Fixed € for a multi-post campaign", example: "€10,000 for 3-month collaboration" },
        { name: "Per Engagement", unit: "€ per like, share, or comment", example: "€0.10 per engagement" }
      ]
    },
    {
      name: "Event Media Coverage",
      pricingOptions: [
        { name: "Per Event", unit: "Fixed € for event coverage", example: "€2,000 for a one-day event" },
        { name: "Per Deliverable", unit: "€ per output", example: "€500 for a highlight video" },
        { name: "Per Hour or Day", unit: "€ per hour or per 8-hour shift", example: "€100/hour for on-site coverage" }
      ]
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {product.name.includes("Cleaning") ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hours">Hours</Label>
                <Input
                  id="hours"
                  type="number"
                  min="1"
                  value={hours}
                  onChange={(e) => setHours(parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Area (sq m)</Label>
                <Input
                  id="area"
                  type="number"
                  min="1"
                  value={area}
                  onChange={(e) => setArea(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {product.pricingOptions.frequencyBased.map((option: any) => (
                    <SelectItem key={option.unit} value={option.unit}>
                      {option.unit.charAt(0).toUpperCase() + option.unit.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        ) : product.name.includes("iD Media") ? (
          <div className="space-y-4">
            <Label htmlFor="serviceTypes">Service Types (Select one or more)</Label>
            <div className="space-y-2">
              {idMediaServices.map((service) => (
                <div key={service.name} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={service.name}
                      checked={selectedServices.includes(service.name)}
                      onCheckedChange={(checked) => handleServiceChange(service.name, checked === true)}
                    />
                    <Label htmlFor={service.name}>{service.name}</Label>
                  </div>
                  {selectedServices.includes(service.name) && (
                    <div className="ml-6 space-y-2">
                      {service.pricingOptions.map((option) => (
                        <div key={option.name} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`${service.name}-${option.name}`}
                              checked={serviceDetails[service.name]?.selectedOptions.some(o => o.name === option.name)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  handleOptionChange(service.name, option.name, 1)
                                } else {
                                  handleOptionChange(service.name, option.name, 0)
                                }
                              }}
                            />
                            <Label htmlFor={`${service.name}-${option.name}`}>{option.name} ({option.unit}) - Example: {option.example}</Label>
                          </div>
                          {serviceDetails[service.name]?.selectedOptions.some(o => o.name === option.name) && (
                            <div className="flex items-center space-x-2 ml-6">
                              <Label htmlFor={`amount-${service.name}-${option.name}`}>Amount:</Label>
                              <Input
                                id={`amount-${service.name}-${option.name}`}
                                type="number"
                                min="1"
                                value={serviceDetails[service.name]?.selectedOptions.find(o => o.name === option.name)?.amount || 1}
                                onChange={(e) => handleOptionChange(service.name, option.name, parseInt(e.target.value) || 1)}
                                className="w-20"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={`customPrice-${service.name}`}>Custom Price (€):</Label>
                        <Input
                          id={`customPrice-${service.name}`}
                          type="number"
                          min="0"
                          value={serviceDetails[service.name]?.customPrice || 0}
                          onChange={(e) => handleCustomPriceChange(service.name, parseFloat(e.target.value) || 0)}
                          className="w-32"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="frequency">Service Frequency</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger id="frequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                {product.pricingOptions.frequencyBased.map((option: any) => (
                  <SelectItem key={option.unit} value={option.unit}>
                    {option.unit.charAt(0).toUpperCase() + option.unit.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="pt-4">
          <p className="text-lg font-semibold">Estimated Price: €{calculatePrice().toFixed(2)}</p>
          {product.name.includes("iD Media") && (
            <p className="text-sm text-gray-600">
              (Based on selected services, options, and amounts)
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="outline" size="icon" onClick={decrementQuantity}>
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              className="w-16 mx-2 text-center"
            />
            <Button variant="outline" size="icon" onClick={incrementQuantity}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleAddToCart} className="bg-[#4A90E2] text-white hover:bg-[#357ABD]">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export type { CleaningServiceDetailProps };

