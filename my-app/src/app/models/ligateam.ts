export interface Ligateam {
  id: number;
  ligateam_name: string;
  points: number;
  president: string;
  // conformity
  // 0 : Conforme
  // 1 : Nombre de joueur incorrect
  // 2 : Non conformité dans la répartition titulaire / remplaçant 
  // 3 : Plus de 3 joueurs d'un même club
  conformity: number;
}
