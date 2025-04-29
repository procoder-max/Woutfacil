import { ArrowLeft, Upload, FileCheck, Video, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DriverOnboardingPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] bg-zinc-900 text-white p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Inscription Chauffeur</h1>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium">Progression</p>
          <p className="text-sm text-emerald-500">2/4 étapes</p>
        </div>
        <Progress value={50} className="h-2 bg-zinc-800" indicatorClassName="bg-emerald-500" />
      </div>

      {/* Onboarding Steps */}
      <Tabs defaultValue="documents" className="flex-1">
        <TabsList className="grid grid-cols-4 bg-zinc-800 mb-6">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="vehicle">Véhicule</TabsTrigger>
          <TabsTrigger value="training">Formation</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="mt-0 space-y-6">
          <div className="bg-zinc-800 rounded-lg p-4">
            <h2 className="text-lg font-medium mb-4">Documents requis</h2>
            <p className="text-sm text-zinc-300 mb-4">
              Veuillez télécharger les documents suivants pour vérification. Tous les documents doivent être lisibles et
              valides.
            </p>

            <div className="space-y-4">
              {[
                { id: "license", name: "Permis de conduire", status: "complete" },
                { id: "registration", name: "Carte grise", status: "pending" },
                { id: "insurance", name: "Assurance", status: "pending" },
                { id: "identity", name: "Pièce d'identité", status: "pending" },
              ].map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-zinc-700 rounded-lg">
                  <div className="flex items-center">
                    {doc.status === "complete" ? (
                      <FileCheck className="w-5 h-5 text-emerald-500 mr-3" />
                    ) : (
                      <Upload className="w-5 h-5 text-zinc-400 mr-3" />
                    )}
                    <span>{doc.name}</span>
                  </div>
                  <Button
                    size="sm"
                    variant={doc.status === "complete" ? "outline" : "default"}
                    className={doc.status === "complete" ? "border-emerald-600 text-emerald-500" : "bg-emerald-600"}
                  >
                    {doc.status === "complete" ? "Voir" : "Télécharger"}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-800 rounded-lg p-4">
            <h2 className="text-lg font-medium mb-4">Photos du véhicule</h2>
            <p className="text-sm text-zinc-300 mb-4">
              Prenez des photos claires de votre véhicule sous différents angles.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {["Avant", "Arrière", "Côté gauche", "Côté droit"].map((angle, index) => (
                <div
                  key={index}
                  className="bg-zinc-700 rounded-lg p-3 flex flex-col items-center justify-center aspect-square"
                >
                  <Upload className="w-8 h-8 text-zinc-500 mb-2" />
                  <p className="text-sm text-zinc-300">{angle}</p>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Continuer</Button>
        </TabsContent>

        <TabsContent value="training" className="mt-0 space-y-6">
          <div className="bg-zinc-800 rounded-lg p-4">
            <h2 className="text-lg font-medium mb-4">Formation en ligne</h2>
            <p className="text-sm text-zinc-300 mb-4">
              Complétez ces courtes vidéos de formation pour améliorer votre service et augmenter vos revenus.
            </p>

            <div className="space-y-4">
              {[
                { id: "intro", title: "Introduction à la plateforme", duration: "5 min", completed: true },
                { id: "service", title: "Excellence du service client", duration: "8 min", completed: false },
                { id: "safety", title: "Sécurité routière", duration: "10 min", completed: false },
                { id: "payment", title: "Gestion des paiements", duration: "7 min", completed: false },
              ].map((video) => (
                <div key={video.id} className="flex items-center justify-between p-3 bg-zinc-700 rounded-lg">
                  <div className="flex items-center">
                    {video.completed ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                    ) : (
                      <Video className="w-5 h-5 text-zinc-400 mr-3" />
                    )}
                    <div>
                      <p className="font-medium">{video.title}</p>
                      <p className="text-xs text-zinc-400">{video.duration}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={video.completed ? "outline" : "default"}
                    className={video.completed ? "border-emerald-600 text-emerald-500" : "bg-emerald-600"}
                  >
                    {video.completed ? "Revoir" : "Regarder"}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-800 rounded-lg p-4">
            <h2 className="text-lg font-medium mb-4">Quiz de validation</h2>
            <p className="text-sm text-zinc-300 mb-4">
              Complétez ce quiz pour valider vos connaissances et finaliser votre inscription.
            </p>
            <Button className="w-full bg-zinc-700 hover:bg-zinc-600" disabled>
              Déverrouillé après les vidéos
            </Button>
          </div>

          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Terminer l'inscription</Button>
        </TabsContent>
      </Tabs>
    </main>
  )
}
