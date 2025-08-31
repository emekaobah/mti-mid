import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import ReactFlagsSelect from "react-flags-select";
import { useState } from "react";
import { X } from "lucide-react";
import { useCountries } from "@/hooks/api/catalog/use-countries";

export function InsightsModal() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const { data: countries, isLoading: isCountriesLoading } = useCountries();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", { selectedCountry });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="flex items-center justify-center space-x-2 rounded-full h-12 w-full sm:w-auto max-w-[240px] bg-[#074318] hover:bg-[#074318]/90 text-base text-white font-semibold px-6 text-center"
        >
          Explore Insights
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[818px] pt-10 lg:pt-24 pb-10 lg:pb-36 flex flex-col items-center justify-center px-4 lg:px-36 rounded-2xl border-0 shadow-xl">
        <DialogClose asChild></DialogClose>

        <form onSubmit={handleSubmit} className="w-full ">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-[22px] font-semibold text-[#074318] text-center">
                Let&apos;s do a quick check
              </h2>
              <p className="text-sm text-[#3A3A3A] text-center">
                Please verify your identity, then the insights are all yours.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 hidden">
                  Select your country
                </label>
                {isCountriesLoading ? (
                  <div className="text-sm text-gray-500 text-center py-4">
                    Loading countries...
                  </div>
                ) : (
                  <ReactFlagsSelect
                    selected={selectedCountry}
                    onSelect={(code) => setSelectedCountry(code)}
                    countries={
                      countries
                        ?.map((country) => country.code)
                        .filter(
                          (code): code is string =>
                            code !== null && code !== undefined
                        ) || []
                    }
                    customLabels={
                      countries?.reduce((acc, country) => {
                        if (country.code && country.name) {
                          acc[country.code] = country.name;
                        }
                        return acc;
                      }, {} as Record<string, string>) || {}
                    }
                    placeholder="Select your country"
                    className="!border-gray-300 !rounded-lg"
                    selectButtonClassName="!border-gray-300 !rounded-lg !bg-white !text-gray-500 !h-15"
                  />
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 hidden">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="h-15 border-gray-300 rounded-lg focus:border-[#074318] focus:ring-[#074318]"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="max-w-48 w-full mx-auto flex items-center justify-center h-12 bg-[#074318] hover:bg-[#074318]/90 text-white font-semibold rounded-full"
            >
              Verify
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
