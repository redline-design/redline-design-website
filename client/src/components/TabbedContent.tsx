import { useState, memo } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
  content: React.ReactNode;
}

interface TabbedContentProps {
  tabs: Tab[];
}

const TabbedContent = memo(function TabbedContent({ tabs }: TabbedContentProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="w-full" data-testid="tabbed-content">
      <div className="flex flex-nowrap gap-1 md:gap-2 mb-8 border-b border-border overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-2 md:px-4 py-2.5 text-xs md:text-sm font-medium transition-colors hover-elevate active-elevate-2 whitespace-nowrap ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
              data-testid={`button-tab-${tab.id}`}
            >
              <div className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span>{tab.label}</span>
              </div>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="relative min-h-[200px]">
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            initial={false}
            animate={{
              opacity: activeTab === tab.id ? 1 : 0,
              x: activeTab === tab.id ? 0 : 20,
            }}
            transition={{ duration: 0.3 }}
            className={activeTab === tab.id ? "block" : "hidden"}
            data-testid={`tab-content-${tab.id}`}
          >
            {tab.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
});

export default TabbedContent;
