Если вам нужно локально протестировать сервис внутри локального миникуба то этот README.md будет полезен.

## Quick start

```sh
# Build node app
npm run build

# Launch minikube
# --vm-driver=docker - on MacOS ingress would not work
# --vm-driver=hyperkit - on MacOS there is timeout issue while connecting to aviata.kz 
minikube start --vm-driver=docker
minikube dashboard

# Make sure to enable ingress (once)
minikube addons enable ingress

# Configure docker env inside minikube
eval $(minikube docker-env)

# Build docker image
docker build -t yeanot -f ../docker/Dockerfile ..

# Apply configuration
kubectl apply -f deployment.yaml
```

Для запуска с `--vm-driver=docker`.
Позволит включить локальный IP для доступа к сервису 

```sh
# Enable tunnel for service
minikube service yeanot-minikube
```

Для запуска с `--vm-driver=hyperkit`
Позволит обращаться к сервису через ingress. e.g `http://yeanot.example.com`

```sh
# Get Ingress IP Address
kubectl get ing --all-namespaces

# Configure local DNS via /etc/hosts
sudo vim /etc/hosts

{IP_ADDRESS} yeanot.example.com
```

## Links

### Force redeploy

**TL;DR;** - `kubectl rollout restart deploy yeanot-deployment`

https://andrewodendaal.com/how-to-force-a-redeploy-in-kubernetes/

