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
    <aside className="w-80 bg-slate-900 border-r border-slate-700 overflow-y-auto">
      <div className="p-4">
        <div className="mb-4 p-3 bg-blue-900/30 border border-blue-700 rounded-lg">
          <p className="text-xs text-blue-300 font-semibold uppercase tracking-wider">
            Navigation système
          </p>
        </div>

        <nav className="space-y-2">
          {sections.map((section) => (
            <div key={section.id} className="mb-2">
              {/* Section Header */}
              <button
                onClick={() => handleSectionClick(section.id)}
                className={`
                  w-full flex items-center justify-between p-3 rounded-lg
                  transition-all duration-200
                  ${
                    activeSection === section.id
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{section.icon}</span>
                  <span className="font-semibold text-sm">{section.title}</span>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    expandedSection === section.id ? 'rotate-180' : ''
                  }`}
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

              {/* Subsections */}
              {expandedSection === section.id && (
                <div className="mt-1 ml-4 space-y-1">
                  {section.subsections.map((subsection) => (
                    <button
                      key={subsection.id}
                      onClick={() => onSectionChange(section.id, subsection.id)}
                      className={`
                        w-full text-left p-2 pl-4 rounded text-sm
                        transition-all duration-200
                        ${
                          activeSection === section.id &&
                          activeSubsection === subsection.id
                            ? 'bg-blue-600 text-white font-medium'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }
                      `}
                    >
                      {subsection.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
