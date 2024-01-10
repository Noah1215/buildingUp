'use client'
import { createClient } from "@/lib/supabase/client";
import React, { createContext, useState, useContext, useEffect, FunctionComponent } from 'react';

const supabase = createClient();

export interface Jobs{
  id: number;
  company: string;
  logo: string;
  job_title: string;
  contract_type: string;
  location: string;
  salary: number;
  work_type: string;
  posted: string;
  description: string;
  responsibilities: string;
  requirements: string;
  link: string;
}

interface JobDataContextProps {
  jobData: Jobs[] | null;
  highlightedCard: number;
  setHighlightedCard: (id: number) => void;
  sortedJobData: Jobs[] | null; 
  setSortedJobData: React.Dispatch<React.SetStateAction<Jobs[] | null>>; 
  showMobileDetails: boolean;
  setShowMobileDetails: (show: boolean) => void;
}

interface JobDataProviderProps {
  children: React.ReactNode;
}

const JobDataContext = createContext<JobDataContextProps | null>(null);

export const sortCard = () => {
  const context = useContext(JobDataContext);
  if (!context){
    throw new Error('Error in JobDataProvider');
  }
  return context;
};

export const JobDataProvider: FunctionComponent<JobDataProviderProps> = ({ children }) => {
  const [jobData, setJobData] = useState<Jobs[] | null>(null);
  const [highlightedCard, setHighlightedCard] = useState<number>(0);
  const [sortedJobData, setSortedJobData] = useState<Jobs[] | null>(null);
  const [showMobileDetails, setShowMobileDetails] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const {data, error} = await supabase.from('jobs').select('*');
      if (error) {
        console.error('Error fetching data:', error.message);
      } else {
        setJobData(data);
      }
    };
    fetchData();
  }, []);

  return (
    <JobDataContext.Provider value={{ highlightedCard, setHighlightedCard, jobData, sortedJobData, setSortedJobData, showMobileDetails ,setShowMobileDetails }}>
    {children}
  </JobDataContext.Provider>
  );
};
