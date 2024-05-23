"use client";

import { useEffect, useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton"

interface Problem {
  title: string;
  difficulty: string;
  acceptance: string;
  description: string;
}

const DashboardHome = () => {
    const [loading, setLoading] = useState<boolean>(false);
  const [problems, setProblems] = useState<Problem[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("api/get");
        setProblems(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center gap-x-4 lg:gap-x-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-2">
        <div className="lg:col-span-4">
          <h1 className="text-md lg:text-2xl font-semibold">Problems</h1>
          <div>
            <Table>
              <TableCaption>Happy Coding !</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Acceptance</TableHead>
                  <TableHead className="text-left">Solution</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && (
                    <TableRow>
                        <TableCell>
                        <Skeleton className="w-[full] h-[20px] rounded-full" />
                        </TableCell>
                        <TableCell>
                        <Skeleton className="w-[full] h-[20px] rounded-full" />
                        </TableCell>
                        <TableCell>
                        <Skeleton className="w-[full] h-[20px] rounded-full" />
                        </TableCell>
                        <TableCell>
                        <Skeleton className="w-[full] h-[20px] rounded-full" />
                        </TableCell>
                    </TableRow>
                    
                )}
                {problems &&
                  problems.map((problem) => (
                    <TableRow>
                      <TableCell className="font-medium truncate">
                        {problem.title}
                      </TableCell>
                      <TableCell>
                        {problem.difficulty.toLowerCase() === "easy" ? (
                            <div
                            className={
                              "font-medium px-4 py-2 w-fit rounded-full text-green-500 bg-green-500/10"}
                          >
                            {problem.difficulty}
                          </div>
                        ) : <></>}
                      {problem.difficulty.toLowerCase() === "medium" ? (
                            <div
                            className={
                              "font-medium px-4 py-2 w-fit rounded-full text-yellow-500 bg-yellow-500/10"}
                          >
                            {problem.difficulty}
                          </div>
                        ) : <></>}
                        {problem.difficulty.toLowerCase() === "hard" ? (
                            <div
                            className={
                              "font-medium px-4 py-2 w-fit rounded-full text-red-500 bg-red-500/10"}
                          >
                            {problem.difficulty}
                          </div>
                        ) : <></>}
                      </TableCell>
                      <TableCell>{problem.acceptance}</TableCell>
                      <TableCell className="text-left truncate">
                        {problem.description}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="lg:col-span-1">
          <Calendar mode="single" className="rounded-md border" />
          <div className="space-y-4 mt-4 lg:mt-8">
            <h1 className="text-md lg:text-xl font-semibold">{`${33}/50`}</h1>
            <Progress value={33} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
