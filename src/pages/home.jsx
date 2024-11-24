import React from 'react';
import  CardContainer, { NavCard } from '../comps/cards'
function Home() {
  return (
    <>
    <div className="lifetrack--home">
      
      <CardContainer cls="card-cont-center">
        
        <NavCard title="Habits" subTitle="Follow Your Habits" route="/habits" />
        <NavCard title="Tasks" subTitle="Complete Your Tasks" route="/tasks" />
        <NavCard title="Finance" subTitle="Keep Track of Your Spendings" route="/finances" />
      
      </CardContainer>

    </div>
    </>
    );
}

export default Home;
