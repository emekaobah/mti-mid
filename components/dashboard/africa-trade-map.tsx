"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AfricaTradeMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🗺️ African Trade Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-muted">
          <div className="text-center text-muted-foreground">
            <div className="text-lg font-medium mb-2">Interactive Heat Map</div>
            <div className="text-sm">
              Countries colored by participation intensity
            </div>
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>High Interest (20+ responses)</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Medium Interest (10-19)</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Low Interest (5-9)</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span>Minimal Interest (1-4)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
