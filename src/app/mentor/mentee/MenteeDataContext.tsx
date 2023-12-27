'use client'
import { createClient } from "@/lib/supabase/client";
import React, { createContext, useState, useContext, useEffect, FunctionComponent } from 'react';

const supabase = createClient();

export interface Mentee{
  username:string;
  email: string;
  phone: string;
  name: string;
  joined_at: string;
  current_trade: string;
  current_employer: string;
  current_wage: number;
  last_wage: number,
  raise: number;
  cohort: string;
  notes: string;
}

interface MenteeDataContextProps {
  menteeData: Mentee[] | null;
  setMenteeData: React.Dispatch<React.SetStateAction<Mentee[] | null>>;
  highlightedCard: string;
  setHighlightedCard: (id: string) => void;
  filteredMenteeData: Mentee[] | null; 
  setFilteredMenteeData: React.Dispatch<React.SetStateAction<Mentee[] | null>>; 
  showMobileDetails: boolean;
  setShowMobileDetails: (show: boolean) => void;
}

interface MenteeDataProviderProps {
  children: React.ReactNode;
}

const MenteeDataContext = createContext<MenteeDataContextProps | null>(null);

export const filterCard = () => {
  const context = useContext(MenteeDataContext);
  if (!context){
    throw new Error('Error in MenteeDataProvider');
  }
  return context;
};

export const MenteeDataProvider: FunctionComponent<MenteeDataProviderProps> = ({ children }) => {
  const [menteeData, setMenteeData] = useState<Mentee[] | null>(null);
  const [highlightedCard, setHighlightedCard] = useState<string>("");
  const [filteredMenteeData, setFilteredMenteeData] = useState<Mentee[] | null>(null);
  const [showMobileDetails, setShowMobileDetails] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const {data, error} = await supabase.from('mentees').select('username,email,phone,name,joined_at,current_trade,current_employer,current_wage,last_wage,raise,cohort,notes');
      if (error) {
        console.error('Error fetching data:', error.message);
      } else {
        setMenteeData(data);
      }
    };
    fetchData();
  }, []);

  return (
    <MenteeDataContext.Provider value={{ highlightedCard, setHighlightedCard, menteeData, setMenteeData, filteredMenteeData, setFilteredMenteeData, showMobileDetails ,setShowMobileDetails }}>
    {children}
  </MenteeDataContext.Provider>
  );
};
