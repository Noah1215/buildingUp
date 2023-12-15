'use client'
import { createClient } from "@/lib/supabase/client";
import React, { createContext, useState, useContext, useEffect, FunctionComponent } from 'react';

const supabase = createClient();

export interface Mentee{
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

interface CardContextProps {
  menteeData: Mentee[] | null;
  highlightedCard: string;
  setHighlightedCard: (id: string) => void;
  filteredMenteeData: Mentee[] | null; 
  setFilteredMenteeData: React.Dispatch<React.SetStateAction<Mentee[] | null>>; 
}

interface CardProviderProps {
  children: React.ReactNode;
}

const CardContext = createContext<CardContextProps | null>(null);

export const filterCard = () => {
  const context = useContext(CardContext);
  if (!context){
    throw new Error('Error in HighlightedCardProvider');
  }
  return context;
};

export const CardProvider: FunctionComponent<CardProviderProps> = ({ children }) => {
  const [menteeData, setMenteeData] = useState<Mentee[] | null>(null);
  const [highlightedCard, setHighlightedCard] = useState<string>("");
  const [filteredMenteeData, setFilteredMenteeData] = useState<Mentee[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const {data, error} = await supabase.from('mentees').select('email,phone,name,joined_at,current_trade,current_employer,current_wage,last_wage,raise,cohort,notes');
      if (error) {
        console.error('Error fetching data:', error.message);
      } else {
        setMenteeData(data);
      }
    };
    fetchData();
  }, []);

  return (
    <CardContext.Provider value={{ highlightedCard, setHighlightedCard, menteeData, filteredMenteeData, setFilteredMenteeData }}>
    {children}
  </CardContext.Provider>
  );
};
