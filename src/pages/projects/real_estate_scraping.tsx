import { useEffect, useState } from 'react';
import Container from "@/components/Container";
import Papa from 'papaparse';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, Globe, Code, Database } from 'lucide-react';

// Gradient component
function Gradient() {
  return (
    <>
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}

// Define an interface for the CSV data rows to improve type safety
type RentalDataRow = Record<string, string | number | null>;

export default function RealEstateScrapingProject() {
  const [csvData, setCsvData] = useState<RentalDataRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [fullCsvText, setFullCsvText] = useState<string>('');

  useEffect(() => {
    const fetchCsvData = async () => {
      try {
        const response = await fetch('/assets/combined_property_listings.csv');
        const text = await response.text();
        setFullCsvText(text);
        
        Papa.parse<RentalDataRow>(text, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            // Limit to first 10 rows
            setCsvData(results.data.slice(0, 10));
            // Explicitly set headers to avoid TypeScript issues
            setHeaders(results.meta.fields ?? []);
            setIsLoading(false);
          },
          error: (error: Error) => {
            void console.error('Error parsing CSV:', error);
            setError(error.message);
            setIsLoading(false);
          }
        });
      } catch (error) {
        void console.error('Error reading file:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    };

    void fetchCsvData();
  }, []);

  // Function to download full CSV
  const downloadFullCsv = () => {
    const blob = new Blob([fullCsvText], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'property_listings.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      <Gradient />
      
      <div className="relative z-10 mt-16">
        <Link href="/" passHref>
          <Button variant="outline" className="mb-8">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Portfolio
          </Button>
        </Link>

        <section className="mb-16">
          <h1 className="text-4xl font-semibold tracking-tight mb-4">
            <span className="text-gradient clash-grotesk">99 Acres</span> Web Scraping Project
          </h1>
          <p className="text-muted-foreground max-w-3xl mb-6">
          Developed an efficient web scraping solution to extract, clean, and organize rental property data from 99 Acres, providing actionable insights for real estate analysis.

          </p>

          <div className="grid md:grid-cols-3 gap-4 max-w-3xl">
            <div className="bg-white/5 p-4 rounded-lg border">
              <Globe className="h-6 w-6 mb-2 text-blue-500" />
              <h3 className="font-semibold mb-2">Complex Web Scraping</h3>
              <p className="text-sm text-muted-foreground">
                Implemented advanced scraping techniques to navigate dynamic web content and extract 
                structured data from 99 Acres rental listings.
              </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border">
              <Code className="h-6 w-6 mb-2 text-green-500" />
              <h3 className="font-semibold mb-2">Data Engineering</h3>
              <p className="text-sm text-muted-foreground">
                Developed a scalable data extraction pipeline with error handling, 
                type conversion, and comprehensive data cleaning.
              </p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border">
              <Database className="h-6 w-6 mb-2 text-purple-500" />
              <h3 className="font-semibold mb-2">Market Intelligence</h3>
              <p className="text-sm text-muted-foreground">
                Transformed raw web data into actionable insights for real estate 
                market analysis and strategic decision-making.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl">Rental Data Analysis</CardTitle>
              <Button 
                variant="outline" 
                onClick={downloadFullCsv}
                disabled={isLoading || !!error}
              >
                <Download className="mr-2 h-4 w-4" /> Download Full CSV
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>Loading data...</p>
              ) : error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        {headers.map((header) => (
                          <th key={header} className="p-2 text-left">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {csvData.map((row, index) => (
                        <tr key={index} className="border-b hover:bg-white/5 transition">
                          {headers.map((header, cellIndex) => (
                            <td key={cellIndex} className="p-2">
                              {row[header] !== null && row[header] !== undefined 
                                ? String(row[header]) 
                                : 'N/A'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-muted-foreground text-sm mt-2 italic">
                    Showing first 10 rows. Full dataset available for download.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Rental Market Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full aspect-video">
                <Image 
                  src="/assets/real_estate_market_analysis.png" 
                  alt="Rental Market Analysis" 
                  fill 
                  className="object-contain"
                />
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Container>
  );
}