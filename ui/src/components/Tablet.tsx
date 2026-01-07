import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import TabContent from './TabContent';
import { sections } from '../data/sections';

const Tablet: React.FC = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [activeSubsection, setActiveSubsection] = useState(
    sections[0].subsections[0].id
  );

  const handleSectionChange = (sectionId: string, subsectionId: string) => {
    setActiveSection(sectionId);
    setActiveSubsection(subsectionId);
  };

  const currentSection = sections.find((s) => s.id === activeSection);
  const currentSubsection = currentSection?.subsections.find(
    (ss) => ss.id === activeSubsection
  );

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Sidebar
          sections={sections}
          activeSection={activeSection}
          activeSubsection={activeSubsection}
          onSectionChange={handleSectionChange}
        />
        {currentSection && currentSubsection && (
          <TabContent section={currentSection} subsection={currentSubsection} />
        )}
      </div>
    </div>
  );
};

export default Tablet;
