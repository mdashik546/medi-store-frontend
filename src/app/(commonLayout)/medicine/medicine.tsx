"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { DialogTrigger } from "@/components/ui/dialog";
import { MedicineDialog } from "./_components/dialog";

export default function Medicine() {
  return (
    <div className="p-6">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Inventory</h2>
        <MedicineDialog />
      </div>

      {/* Modal (always visible here just for design) */}

      {/* Table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>All Medicines</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Paracetamol</TableCell>
                <TableCell>200</TableCell>
                <TableCell>50</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ibuprofen</TableCell>
                <TableCell>150</TableCell>
                <TableCell>30</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Aspirin</TableCell>
                <TableCell>100</TableCell>
                <TableCell>20</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
