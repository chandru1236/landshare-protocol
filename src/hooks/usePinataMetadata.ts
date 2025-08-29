import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MetadataResponse {
  success: boolean;
  metadata?: any;
  ipfsUrl?: string;
  contractAddress?: string;
  error?: string;
}

export const usePinataMetadata = () => {
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<any>(null);
  const { toast } = useToast();

  const fetchMetadata = async (contractAddress: string, ipfsHash?: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-pinata-metadata', {
        body: { contractAddress, ipfsHash }
      });

      if (error) throw error;

      const response = data as MetadataResponse;
      
      if (response.success && response.metadata) {
        setMetadata(response.metadata);
        toast({
          title: "Metadata Retrieved",
          description: `Successfully fetched metadata for contract ${contractAddress}`,
        });
        return response.metadata;
      } else {
        throw new Error(response.error || 'Failed to fetch metadata');
      }
    } catch (error) {
      console.error('Error fetching metadata:', error);
      toast({
        title: "Error",
        description: `Failed to fetch metadata: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchLandTokenMetadata = async () => {
    return fetchMetadata('0x2089cb616333462e0987105f137DD8Af2C190957');
  };

  const fetchFractionalizationMetadata = async () => {
    return fetchMetadata('0x7eFd92FAB22CAD2a2EBaF5795D43e9eE1367dbf6');
  };

  return {
    loading,
    metadata,
    fetchMetadata,
    fetchLandTokenMetadata,
    fetchFractionalizationMetadata,
  };
};