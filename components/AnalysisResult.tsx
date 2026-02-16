
import React from 'react';
import { FoodAnalysisResult } from '../types';
import NutritionChart from '../NutritionChart';
import Badge from './ui/Badge';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Flame, 
  Dna, 
  Wheat, 
  Droplet,
  Zap
} from 'lucide-react';

interface Props {
  result: FoodAnalysisResult;
  imageUrl?: string;
}

const AnalysisResult: React.FC<Props> = ({ result, imageUrl }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-300">
      {/* Header with Image or Color block */}
      <div className="relative h-56 bg-slate-100">
        {imageUrl ? (
          <img src={imageUrl} alt={result.foodName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20">
            <Zap className="w-12 h-12 text-white" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
           <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/20">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{result.foodName}</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant={result.healthScore > 70 ? 'success' : result.healthScore > 40 ? 'warning' : 'error'}>
                   Score: {result.healthScore}/100
                </Badge>
                <Badge variant="info">{result.processingLevel}</Badge>
              </div>
           </div>
        </div>
      </div>

      <div className="p-8 space-y-10">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100 flex flex-col items-center group transition-colors hover:bg-orange-50">
            <Flame className="w-6 h-6 text-orange-500 mb-1" />
            <span className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">Calorias</span>
            <span className="text-xl font-black text-orange-900">{result.calories}</span>
            <span className="text-[10px] text-orange-600 font-bold">kcal</span>
          </div>
          <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex flex-col items-center group transition-colors hover:bg-blue-50">
            <Dna className="w-6 h-6 text-blue-500 mb-1" />
            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Proteína</span>
            <span className="text-xl font-black text-blue-900">{result.macros.protein}g</span>
          </div>
          <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 flex flex-col items-center group transition-colors hover:bg-amber-50">
            <Wheat className="w-6 h-6 text-yellow-600 mb-1" />
            <span className="text-[10px] text-yellow-600 font-bold uppercase tracking-wider">Carbos</span>
            <span className="text-xl font-black text-yellow-900">{result.macros.carbs}g</span>
          </div>
          <div className="bg-red-50/50 p-4 rounded-2xl border border-red-100 flex flex-col items-center group transition-colors hover:bg-red-50">
            <Droplet className="w-6 h-6 text-red-500 mb-1" />
            <span className="text-[10px] text-red-600 font-bold uppercase tracking-wider">Gordura</span>
            <span className="text-xl font-black text-red-900">{result.macros.fat}g</span>
          </div>
        </div>

        {/* Charts and Details */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-indigo-500" />
              Nutrição (g/Porção)
            </h3>
            <NutritionChart data={result.macros} />
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Resumo da IA</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{result.description}</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg w-fit">
                ESTIMATIVA: {result.estimatedWeight}
              </div>
            </div>

            {result.allergens.length > 0 && (
              <div className="bg-red-50 border border-red-100 p-5 rounded-2xl">
                <h4 className="text-red-800 font-black text-xs flex items-center gap-2 mb-3 tracking-widest uppercase">
                  <AlertTriangle className="w-4 h-4" />
                  Alérgenos Potenciais
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.allergens.map((a, i) => (
                    <Badge key={i} variant="error">{a}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pros and Cons */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50/30 p-6 rounded-3xl border border-emerald-100/50">
            <h4 className="text-emerald-800 font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Por que comer?
            </h4>
            <ul className="space-y-3">
              {result.pros.map((pro, i) => (
                <li key={i} className="text-sm text-emerald-700 flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 shadow-sm shadow-emerald-200" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-rose-50/30 p-6 rounded-3xl border border-rose-100/50">
            <h4 className="text-rose-800 font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              Pontos de Atenção
            </h4>
            <ul className="space-y-3">
              {result.cons.map((con, i) => (
                <li key={i} className="text-sm text-rose-700 flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-rose-500 flex-shrink-0 shadow-sm shadow-rose-200" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
          <h4 className="text-slate-800 font-bold mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-500" />
            Dicas do Nutricionista IA
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            {result.tips.map((tip, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 text-sm text-slate-600 shadow-sm hover:border-indigo-200 transition-colors">
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
