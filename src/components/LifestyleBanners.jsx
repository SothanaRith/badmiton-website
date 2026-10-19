import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LifestyleBanners({ onSelectCategory }) {
  const { lang } = useLanguage();

  return (
    <section className="lifestyle-section">
      <div className="container">
        <div className="lifestyle-grid">
          {/* Card 1: Men's Pro Series */}
          <div className="lifestyle-card lifestyle-card-men">
            <div className="lifestyle-card-inner">
              <div className="lifestyle-text">
                <span className="lifestyle-tag">
                  <Sparkles size={13} />
                  <span>{lang === 'km' ? 'សម្ភារៈកម្រិតជើងឯក' : 'CHAMPIONSHIP TOUR'}</span>
                </span>
                <h3 className="lifestyle-heading">
                  {lang === 'km' ? 'សម្ភារៈកម្លាំង & វាយប្រហារសម្រាប់បុរស' : 'Power & Attack Gear for Him'}
                </h3>
                <p className="lifestyle-body">
                  {lang === 'km'
                    ? 'ខោអាវប្រកួតស្ងួតឆាប់ រ៉ាកែតក្បាលធ្ងន់សម្រាប់វាយសំពាស និងស្បែកជើងទប់ជំហរបានយ៉ាងរឹងមាំ។'
                    : 'High-durability dry-fit tournament apparel, heavy attack rackets, and high-stability footwear.'}
                </p>

                <div className="lifestyle-mini-deal">
                  <span className="deal-label">{lang === 'km' ? 'សម្លៀកបំពាក់ Pro Team' : 'Pro Team Apparel'}</span>
                  <span className="deal-discount">{lang === 'km' ? 'បញ្ចុះតម្លៃរហូតដល់ 30%' : 'Up to 30% Off'}</span>
                </div>

                <button 
                  className="lifestyle-btn"
                  onClick={() => onSelectCategory('rackets')}
                >
                  <span>{lang === 'km' ? 'មើលសម្ភារៈបុរស' : "Explore Men's Gear"}</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="lifestyle-img-wrap">
                <img 
                  src="/images/player-men.jpg" 
                  alt="Men's Badminton Tournament Gear" 
                  className="lifestyle-img"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Women's Agility Series */}
          <div className="lifestyle-card lifestyle-card-women">
            <div className="lifestyle-card-inner">
              <div className="lifestyle-text">
                <span className="lifestyle-tag tag-lavender">
                  <Sparkles size={13} />
                  <span>{lang === 'km' ? 'ភាពរហ័សរហួន & ល្បឿន' : 'AGILITY & SPEED'}</span>
                </span>
                <h3 className="lifestyle-heading">
                  {lang === 'km' ? 'សម្ភារៈស្រាល & រហ័សសម្រាប់នារី' : 'Lightweight Agility Gear for Her'}
                </h3>
                <p className="lifestyle-body">
                  {lang === 'km'
                    ? 'រ៉ាកែតស្រាល 5U ស្បែកជើងស្រាលខ្យល់ដកស្រួល និងសំពត់កីឡាយឺតស្រួលផ្លាស់ទី។'
                    : 'Ultra-light 5U rackets, featherweight breathable court shoes, and ergonomic tournament skirts.'}
                </p>

                <div className="lifestyle-mini-deal">
                  <span className="deal-label">{lang === 'km' ? 'ម៉ូដស្រាល Aerus Z2' : 'Aerus Z2 Light Series'}</span>
                  <span className="deal-discount">{lang === 'km' ? 'ពណ៌ថ្មីទើបចេញ' : 'New Color Drop'}</span>
                </div>

                <button 
                  className="lifestyle-btn"
                  onClick={() => onSelectCategory('shoes')}
                >
                  <span>{lang === 'km' ? 'មើលសម្ភារៈនារី' : "Explore Women's Gear"}</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="lifestyle-img-wrap">
                <img 
                  src="/images/player-women.jpg" 
                  alt="Women's Badminton Agility Gear" 
                  className="lifestyle-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
