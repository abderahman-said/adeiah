import { useState } from 'react';
import { Sun, Moon, RefreshCw, BookOpen, Book, Repeat } from 'lucide-react';
import { arafahAdeiah } from './data/adeiah';
import { morningAzkar, eveningAzkar } from './data/azkar';

const tabs = [
  { id: 'arafah', label: 'أدعية عرفة', icon: '🌿' },
  { id: 'morning', label: 'أذكار الصباح', icon: '☀️' },
  { id: 'evening', label: 'أذكار المساء', icon: '🌙' },
];

function App() {
  const [activeTab, setActiveTab] = useState('arafah');
  const [counters, setCounters] = useState({});
  const [readItems, setReadItems] = useState({});

  const getActiveData = () => {
    switch (activeTab) {
      case 'arafah': return arafahAdeiah;
      case 'morning': return morningAzkar;
      case 'evening': return eveningAzkar;
      default: return arafahAdeiah;
    }
  };

  const getKey = (item) => `${activeTab}_${item.id}`;

  const toggleRead = (item) => {
    const key = getKey(item);
    setReadItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isRead = (item) => readItems[getKey(item)] || false;

  const increment = (item) => {
    const key = getKey(item);
    const max = item.count || item.repeat || 1;
    setCounters(prev => ({
      ...prev,
      [key]: Math.min((prev[key] || 0) + 1, max),
    }));
  };

  const reset = (item) => {
    const key = getKey(item);
    setCounters(prev => ({ ...prev, [key]: 0 }));
  };

  const getCount = (item) => counters[getKey(item)] || 0;
  const isDone = (item) => (item.count || item.repeat) && getCount(item) >= (item.count || item.repeat);

  return (
    <div className="app" dir="rtl">

      {/* ─── Header ─── */}
      <header className="header">
        <div className="header-inner">
          <p className="bismillah">بسم الله الرحمن الرحيم</p>
          <h1 className="logo">زاد المسلم</h1>
          <p className="header-sub">أدعية وأذكار يومية مختارة</p>
        </div>
      </header>

      {/* ─── Tabs ─── */}
      <nav className="tabs-bar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* ─── Cards ─── */}
      <main className="content">
        <p className="section-label">{tabs.find(t => t.id === activeTab)?.label}</p>

        {getActiveData().map((item, index) => {
          const count = getCount(item);
          const done = isDone(item);

          return (
            <div
              key={`${item.id}_${activeTab}`}
              className="card"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Card Header */}
              <div className="card-header">
                <div className="card-num">{index + 1}</div>
                <div className="card-title-group">
                  <h2 className="card-title">{item.title}</h2>
                  <div className="card-meta">
                    {item.time && (
                      <span className={`time-badge ${item.time}`}>
                        {item.time === 'morning' ? <Sun size={14} /> : <Moon size={14} />}
                        <span>{item.time === 'morning' ? 'صباح' : 'مساء'}</span>
                      </span>
                    )}
                    {item.count && (
                      <span className="count-badge">
                        <Repeat size={14} />
                        <span>{item.count}</span>
                      </span>
                    )}
                  </div>
                </div>
                <div className="card-actions">
                  <button
                    className={`read-btn ${isRead(item) ? 'read' : ''}`}
                    onClick={() => toggleRead(item)}
                    title={isRead(item) ? 'غير مقروء' : 'تمت قراءته'}
                  >
                    {isRead(item) ? <BookOpen size={16} /> : <Book size={16} />}
                  </button>
                  {done && <span className="done-badge">✓ مكتمل</span>}
                </div>
              </div>

              {/* Dua Text */}
              <div className={`card-body ${isRead(item) ? 'read' : ''}`}>
                {(item.count || item.repeat) > 1 && (
                  <div className="repeat-badge">
                    <span className="repeat-dot" />
                    يُقال {item.count || item.repeat} مرة
                  </div>
                )}
                <p className="dua-text">{item.text}</p>
              </div>

              {/* Source */}
              <div className="card-source">
                {item.source && <p className="source-label">{item.source}</p>}
                <p className="source-text">{item.description}</p>
              </div>

              {/* Counter Row */}
              {(item.count || item.repeat) > 1 && (
                <div className="counter-row">
                  <span className="counter-label">العداد</span>
                  <span className="counter-display">{count} / {item.count || item.repeat}</span>
                  <button
                    className="count-btn"
                    onClick={() => increment(item)}
                    disabled={done}
                  >
                    {done ? '✓ تم' : '+ عُدّ'}
                  </button>
                  {count > 0 && (
                    <button
                    className="reset-btn" 
                    onClick={() => reset(item)}
                    title="إعادة تعيين"
                  >
                    <RefreshCw size={14} />
                  </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default App;