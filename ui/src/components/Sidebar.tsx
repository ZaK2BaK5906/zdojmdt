import React from 'react';
import type { Section } from '../types';

interface SidebarProps {
  sections: Section[];
  activeSection: string;
  activeSubsection: string;
  onSectionChange: (sectionId: string, subsectionId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sections,
  activeSection,
  activeSubsection,
  onSectionChange,
}) => {
  const [expandedSection, setExpandedSection] = React.useState<string>(activeSection);

  const handleSectionClick = (sectionId: string) => {
    if (expandedSection === sectionId) {
      setExpandedSection('');
    } else {
      setExpandedSection(sectionId);
      // Automatically select first subsection
      const section = sections.find((s) => s.id === sectionId);
      if (section && section.subsections.length > 0) {
        onSectionChange(sectionId, section.subsections[0].id);
      }
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-badge">
          <p>Navigation système</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {sections.map((section) => (
          <div key={section.id} className="section">
            <button
              onClick={() => handleSectionClick(section.id)}
              className={`section-btn ${activeSection === section.id ? 'active' : ''}`}
            >
              <div className="section-btn-left">
                <span className="section-icon">{section.icon}</span>
                <span>{section.title}</span>
              </div>
              <svg
                className={`section-arrow ${expandedSection === section.id ? 'expanded' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {expandedSection === section.id && (
              <div className="subsections">
                {section.subsections.map((subsection) => (
                  <button
                    key={subsection.id}
                    onClick={() => onSectionChange(section.id, subsection.id)}
                    className={`subsection-btn ${
                      activeSection === section.id && activeSubsection === subsection.id
                        ? 'active'
                        : ''
                    }`}
                  >
                    {subsection.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
